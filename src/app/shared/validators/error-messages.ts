export const clientFormErroMsg = {
  name: {
    required: `Name can't be blank.`,
    whitespace: `Name can't be blank.`,
    pattern: `Invalid Name`,
  },
  email: {
    required: `Email can't be blank.`,
    whitespace: `Email can't be blank.`,
    pattern: `Invalid email.`,
    email: 'Invalid email.',
  },
  phone: {
    required: `Mobile Number can't be blank.`,
    whitespace: `Mobile Number can't be blank.`,
    pattern: `Invalid Mobile No`,
  },
  image: {
    required: `Please add a profile picture`,
    whitespace: `Please add a profile picture`,
    extension: `Invalid image type`,
  },
}
