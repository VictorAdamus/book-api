'use client'


import { ChangeEvent, useState } from "react";
import books from "../store/bookStore";
import { observer } from "mobx-react-lite";


const Header = observer( () => {

  const [inputValue, setInputValue] = useState('')

  const handleChange =(e:ChangeEvent<HTMLInputElement> )=> {
    setInputValue(e.target.value)
  }

  const getBookTitle = async (title:string)=>{
   await books.setTitleBook(title)
   await books.fetchBooks()
  }

  return (
   
      <header className="w-full bg-[url(./image/bg-main.jpg)] bg-center bg-cover bg-no-repeat p-10 border-b border-black">
        <h1 className="text-3xl text-white font-bold tracking-wider">
          Search for books
        </h1>
        <form className="w-full p-10 bg-black/50 flex flex-col items-center justify-start gap-4 mb-4">
          <div className="w-full flex items-center justify-start gap-4">
            <input value={inputValue} onChange={handleChange} className="py-2 px-4 rounded-lg w-full" type="text"></input>
            <button className="bg-white/70 flex items-center justify-center py-2 px-4 rounded-lg" onClick={(e)=>{
              e.preventDefault()
                getBookTitle(inputValue)
              }}>
              Search
            </button>
          </div>
          <div className="w-full grid grid-cols-2 gap-12">
            <div className="flex items-center justify-start gap-4">
              <span className="text-white">Category:</span>
              <select className="w-full p-2 rounded">
              </select>
            </div>
            <div className="flex items-center justify-start gap-4">
              <span className="text-white">Sorting&nbsp;by:</span>
              <select className="w-full p-2 rounded"></select>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center text-indigo-700">
        {books.booksCount > 1 ? (
          <span>Found <span className="text-xl font-extrabold">{books.booksCount}</span> books</span>
        ) : (
          <span>Found <span className="text-xl font-extrabold">{books.booksCount}</span> book</span>
        )}
      </div>
      </header>

  );
})

export default Header;
