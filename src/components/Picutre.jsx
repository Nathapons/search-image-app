export default function Picture(props) {
    const {urls, dsescription} = props

    return (
        <>
            <img src={urls.small} alt={dsescription} />
        </>
    )
}