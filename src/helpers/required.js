export const required = (m = '') => {
    throw new Error("This argument is required!")
}