'use client'


import { ChangeEvent, useState } from "react";
import books from "../store/bookStore";
import { observer } from "mobx-react-lite";


const Header = observer( () => {

  const [inputValue, setInputValue] = useState('')
  const [selectValueFilter, setSelectValueFilter] = useState('All')
  const [selectValueSorting, setSelectValueSorting] = useState('newest')

  const handleChange =(e:ChangeEvent<HTMLInputElement> )=> {
    setInputValue(e.target.value)
  }

  console.log('inner', selectValueFilter);
  

  const toogleSelectFilter =(event:ChangeEvent<HTMLSelectElement>)=>{
    setSelectValueFilter(event.target.value)
    books.selectCategory(event.target.value)
  }

  const toogleSelectSorting =(event:ChangeEvent<HTMLSelectElement>)=>{
    setSelectValueSorting(event.target.value)
    books.sortingBooks(event.target.value)
  }

  const getBookTitle = async (title:string)=>{
   books.setTitleBook(title)
   await books.fetchBooks()
  }

  return (
   
      <header className="w-full bg-[url(./image/bg-main.jpg)] bg-center bg-cover bg-no-repeat p-4 md:p-10 max-[420px]:p-0 max-[420px]:pb-4  border-b border-black">
        <h1 className="text-3xl text-white font-bold tracking-wider max-[420px]:text-lg">
          Search for books
        </h1>
        <form className="w-full p-4 py-8  md:p-10 bg-black/50 flex flex-col text-xs md:text-sm items-center justify-start gap-4 mb-4">
          <div className="w-full flex items-center justify-start gap-4">
            <input value={inputValue} onChange={handleChange} placeholder="book title..." className="py-2 px-4 rounded-lg w-full" type="text"></input>
            <button className="bg-white/70 flex items-center justify-center py-2 px-4 rounded-lg duration-300 hover:opacity-30" onClick={(e)=>{
              e.preventDefault()
                getBookTitle(inputValue)
              }}>
              Search
            </button>
          </div>
          <div className="w-full grid grid-cols-2 gap-12">
            <div className="flex items-center justify-start gap-4 max-[420px]:flex-col max-[420px]:gap-1">
              <span className="text-white">Category:</span>
              <select className="w-full p-2 rounded" value={selectValueFilter} onChange={toogleSelectFilter}>
                <option value='All'>all</option>
                <option value='Art'>art</option>
                <option value='Biography'>biography</option>
                <option value='Computers'>computers</option>
                <option value='History'>history</option>
                <option value='Medical'>medical</option>
                <option value='Poetry'>poetry</option>
              </select>
            </div>
            <div className="flex items-center justify-start gap-4 max-[420px]:flex-col max-[420px]:gap-1">
              <span className="text-white">Sorting&nbsp;by:</span>
              <select className="w-full p-2 rounded" value={selectValueSorting} onChange={toogleSelectSorting}>
                <option value='newest'>newest</option>
                <option value='alphabet'>alphabet</option>
              </select>
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
