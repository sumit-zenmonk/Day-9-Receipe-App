export const ApiCallService = async (url: string, method: string, headers?: any, body?: string) => {
    try {
        const result = await fetch(url, {
            method,
            body,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            }
        });

        if (!result.ok) {
            const errorText = await result.text();
            console.error(`API Error ${result.status}:`, errorText);

            try {
                return JSON.parse(errorText);
            } catch {
                return { message: `Server error: ${result.status}` };
            }
        }

        return await result.json();
    } catch (err) {
        console.error("Network or Runtime Error:", err);
        return { message: "Network connection failed" };
    }
};
