export const jobLoader = async({params}) => {

    const res = await fetch(`http://localhost:8000/jobs/${params.id}`)

    const data = await res.json()

    return data;
}