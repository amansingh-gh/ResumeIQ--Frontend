const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const getResumeImages = async () => {
    const response = await fetch(
        "https://api.pexels.com/v1/search?query=resume&per_page=20",
        {
            headers: {
                Authorization: API_KEY,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch images");
    }

    return response.json();
};