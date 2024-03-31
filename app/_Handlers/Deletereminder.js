export const deletereminder = async (reminder_id,type) => {
    try {

        const config = {
            method: "DELETE"
        };
        const res = await fetch(`http://localhost:8080/reminder/${type}/${reminder_id}`, config);
        const data = await res.json();
        //console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}