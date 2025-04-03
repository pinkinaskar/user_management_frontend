export const RegxPattern = {
    alphabetWithSpace: /^[A-Z a-z]+$/,
    slug: /^[a-z_]+$/,
    userName: /^[a-z0-9-_.]+$/,
    // email: /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}.[[a-z]{2,5}$/,
    email: /^[a-z0-9-_\.]+@([\a-z-]+\.)+[\a-z-]{2,5}$/,
    address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
    // phoneNo: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
    phoneNo: /^[1-9][0-9]{9,14}$/,
    alphabet: /^[A-Za-z]+$/,
    numeric: /^[0-9]*$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$€£%^&*()_+\-=\[\]{}`~;':"\\|,.<>\/?])[A-Za-z\d!@#$€£%^&*()_+\-=\[\]{}`~;':"\\|,.<>\/?]{8,}/,
    alphaNumeric: /^[a-zA-Z0-9]+$/,
    placeholder: /^[a-zA-Z0-9 .,-]+$/
}