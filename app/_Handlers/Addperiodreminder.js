const Addperiodreminder = async (jsonData) => {
    const url = 'http://localhost:8080/reminder/period/';

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    };

    try {
        const response = await fetch(url, config);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default Addperiodreminder;
