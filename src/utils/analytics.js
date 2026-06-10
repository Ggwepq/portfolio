import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, arrayUnion } from 'firebase/firestore';

// Keep track of the active initialization promise to prevent double-initialization
// and to allow pages/components to await it if they mount before it finishes.
let initPromise = null;

/**
 * Initializes tracking for a visitor.
 * Saves session information and basic IP details.
 * Prevents multiple records in a single session using sessionStorage.
 */
export const trackVisitorInit = async () => {
  if (!db) return null;

  // Avoid double tracking in the same session
  const existingDocId = sessionStorage.getItem('visitorDocId');
  if (existingDocId) {
    return existingDocId;
  }

  // If initialization is already in progress, return the existing promise
  if (initPromise) {
    return initPromise;
  }

  // Create the promise and cache it
  initPromise = (async () => {
    let ipData = {
      ip: 'Unknown IP',
      city: 'Unknown City',
      country_name: 'Unknown Country',
      latitude: '',
      longitude: '',
      org: 'Unknown ISP'
    };

    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        ipData = await res.json();
      }
    } catch (e) {
      console.warn("IP tracking blocked or failed (possibly adblocker):", e);
    }

    // Get referrer information
    const referrer = document.referrer || '';
    
    // Get query parameters (e.g. ?ref=resume or ?source=linkedin)
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref') || params.get('source') || '';

    // Initial check: is this visitor likely an employer or recruiter?
    const referrerKeywords = /linkedin|indeed|glassdoor|upwork|fiverr|recru/i;
    const queryKeywords = /resume|cv|linkedin|recruiter|employer|job|hire|upwork/i;
    
    const isLikelyEmployer = 
      referrerKeywords.test(referrer) || 
      queryKeywords.test(refParam);

    const visitorData = {
      ip: ipData.ip || 'Unknown IP',
      location: `${ipData.city || 'Unknown City'}, ${ipData.country_name || 'Unknown Country'}`,
      lat: ipData.latitude || '',
      lng: ipData.longitude || '',
      isp: ipData.org || 'Unknown ISP',
      device: /Mobile|Android|iP(ad|hone)/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      referrer: referrer,
      refParam: refParam,
      isLikelyEmployer: isLikelyEmployer,
      clickedResume: false,
      clickedLinkedIn: false,
      clickedGithub: false,
      sentMessage: false,
      viewedProjects: [] // Initialize empty array for projects viewed
    };

    try {
      const docRef = await addDoc(collection(db, 'visitors'), visitorData);
      sessionStorage.setItem('visitorDocId', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error logging visitor info: ", error);
      return null;
    }
  })();

  return initPromise;
};

/**
 * Ensures a valid visitorDocId is retrieved (awaits initialization if active, or triggers a new one).
 */
const getOrInitializeVisitorId = async () => {
  let visitorId = sessionStorage.getItem('visitorDocId');
  if (visitorId) return visitorId;

  // Await active initialization if it's already running
  if (initPromise) {
    visitorId = await initPromise;
    if (visitorId) return visitorId;
  }

  // If no init was triggered yet (e.g., direct link to project detail page), trigger it now
  visitorId = await trackVisitorInit();
  return visitorId;
};

/**
 * Updates an active visitor's behavior (e.g. clicking resume, clicking LinkedIn).
 * Automatically marks the visitor as a likely employer if they trigger high-intent events.
 * @param {Object} activity - Object representing updated fields (e.g., { clickedResume: true })
 */
export const updateVisitorActivity = async (activity) => {
  if (!db) return;

  const visitorId = await getOrInitializeVisitorId();
  if (!visitorId) {
    console.warn("Failed to retrieve or initialize visitorId, skipping activity update.");
    return;
  }

  try {
    const docRef = doc(db, 'visitors', visitorId);
    
    // If they click resume or send a message, they are definitely an employer/interested recruiter.
    const updates = { ...activity };
    if (activity.clickedResume || activity.sentMessage) {
      updates.isLikelyEmployer = true;
    }

    await updateDoc(docRef, {
      ...updates,
      lastActive: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating visitor activity: ", error);
  }
};

/**
 * Adds a project ID to the viewedProjects list of the active visitor.
 * @param {string} projectId - The ID of the viewed project
 */
export const trackProjectView = async (projectId) => {
  if (!db) return;

  const visitorId = await getOrInitializeVisitorId();
  if (!visitorId) {
    console.warn("Failed to retrieve or initialize visitorId, skipping project view track.");
    return;
  }

  try {
    const docRef = doc(db, 'visitors', visitorId);
    await updateDoc(docRef, {
      viewedProjects: arrayUnion(projectId),
      lastActive: serverTimestamp()
    });
  } catch (error) {
    console.error("Error logging project view: ", error);
  }
};
