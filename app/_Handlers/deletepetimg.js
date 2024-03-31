export const deletepetimg = async (petid) => {
    try {

        const config = {
            method: "DELETE"
        };
        const res = await fetch(`http://localhost:8080/image/${petid}`, config);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

