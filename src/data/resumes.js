export const resumes = [
    {
        id: 'developer',
        title: 'Developer Resume',
        role: 'Software & Web Developer',
        description: 'Focuses on frontend & full-stack development, React, JavaScript, Node.js, and modern web applications.',
        tags: ['React', 'JavaScript', 'Node.js', 'Vite', 'REST APIs', 'UI/UX'],
        // You can use a local path in /public/resumes/ OR a Google Drive / cloud direct link
        url: 'https://drive.google.com/file/d/1M4hAM1bVy0fp83YVPG_WjuDJqdpWHVdK/view?usp=sharing',
        downloadFilename: 'John_Cedric_Abaloyan_Developer_Resume.pdf'
    },
    {
        id: 'it-support',
        title: 'IT Support Resume',
        role: 'IT Support & Systems Specialist',
        description: 'Focuses on technical helpdesk support, system troubleshooting, hardware/software maintenance, and networking.',
        tags: ['IT Helpdesk', 'Troubleshooting', 'Networking', 'Hardware & OS', 'Client Support'],
        // You can use a local path in /public/resumes/ OR a Google Drive / cloud direct link
        url: 'https://drive.google.com/file/d/1yTaK5K72ikQt7RJgVN-OudjvLIHBwbxQ/view?usp=sharing',
        downloadFilename: 'John_Cedric_Abaloyan_IT_Support_Resume.pdf'
    }
];

export function getResumeEmbedUrl(url) {
    if (!url) return '';
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    const docsMatch = url.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (docsMatch && docsMatch[1]) {
        return `https://docs.google.com/document/d/${docsMatch[1]}/preview`;
    }
    return url;
}

export function getResumeDownloadUrl(url) {
    if (!url) return '';
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
    }
    return url;
}
