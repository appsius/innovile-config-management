import axios from 'axios';

const getData = async (dataURL, setData) => {
  const res = await fetch(dataURL);
  const data = await res.json();
  const sortedAutocorrections = data.sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  );
  setData(sortedAutocorrections);
};

const createData = async (dataURL, setData, createURL, body) => {
  await fetch(createURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  getData(dataURL, setData);
};

const updateData = async (dataURL, setData, updateURL, body) => {
  await fetch(updateURL, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  getData(dataURL, setData);
};

const deleteData = async (dataURL, setData, deleteURL) => {
  await fetch(deleteURL, {
    method: 'DELETE',
  });
  getData(dataURL, setData);
};

export { getData, createData, updateData, deleteData };
