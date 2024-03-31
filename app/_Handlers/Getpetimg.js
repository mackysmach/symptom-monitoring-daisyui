export const getpetimg = async (petid) => {
    try {
        const res = await fetch(`http://localhost:8080/image/${petid}`)
        let data = await res.json()
        switch (res.status) {
            case 404:
                data = null
                break
            case 500:
                throw new Error(data.error)
            default:
                data = data.image_url
        }
        return data
    } catch (error) {
        throw error
    }
}