
const wrapResponse = (data, status = 200, resultsName = 'results') => {
  const wrapper = { status };
  wrapper[resultsName] = data;
  return wrapper;
};

export default wrapResponse;
