const initialState = {
  isLoading: false,
  data: {
    name: '',
    dob: '',
    address: ''
  }
};
const reportReducer = (state = initialState,  action: object) => {
  return {
    ...state
  }
}

export default reportReducer;