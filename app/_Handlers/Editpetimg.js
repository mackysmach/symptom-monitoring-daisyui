const Editpetimg = async (formData,petid) => {
    const url = `http://localhost:8080/image/${petid}`;

    const config = {
        method: "PUT",
        body: formData,
    };

    try {
        const response = await fetch(url, config);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default Editpetimg;
