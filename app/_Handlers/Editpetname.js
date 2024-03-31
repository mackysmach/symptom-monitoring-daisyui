const Editpetname = async (jsonData) => {
    const url = `http://localhost:8080/pet/`;
    
    const config = {
        method: "PUT",
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
}

export default Editpetname;


