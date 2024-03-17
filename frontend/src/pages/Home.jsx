import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-indigo-800 font-bold mb-4">Welcome to Bookstore Management System</h1>
        <p className="text-lg text-gray-600">Explore, Edit, and Manage Your Book Collection</p>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-indigo-800">Book List</h2>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-indigo-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full table-fixed border border-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/12 py-2 border border-black">No</th>
              <th className="w-3/12 py-2 border border-black">Title</th>
              <th className="w-3/12 py-2 border border-black">Author</th>
              <th className="w-2/12 py-2 border border-black">Publish Year</th>
              <th className="w-3/12 py-2 border border-black">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="bg-white">
                <td className="py-2 border border-black">{index + 1}</td>
                <td className="py-2 border border-black">{book.title}</td>
                <td className="py-2 border border-black">{book.author}</td>
                <td className="py-2 border border-black">{book.publishYear}</td>
                <td className="py-2 flex justify-center items-center space-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-indigo-800 text-2xl" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-indigo-800 text-2xl" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-indigo-800 text-2xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
