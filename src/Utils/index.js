/**
 * Get image url
 *
 * @param {string}  - ex) image-{file_name}-jpg
 * @return {string} - ex) /images/{file_name}.jpg
 */
const getImagePath = (imageRef) => {
    const firstIndex = imageRef.indexOf('-');
    const lastIndex = imageRef.lastIndexOf('-')
    
    return `/images/${imageRef.slice(firstIndex + 1, lastIndex)}.${imageRef.slice(lastIndex + 1)}`;
}

export default {
    getImagePath,
};
