"use client";
import bookStore from "./store/bookStore";
import Image from "next/image";
import imgUnd from './image/undefinedImg.png'
import {observer} from "mobx-react-lite";
import Link from "next/link";
import {useState} from "react";

import undefImg from "./image/undefinedImg.png";
import bookstore from "./store/bookStore";

interface Book {
  etag: string;
  volumeInfo: {
    imageLinks: {smallThumbnail: string};
    title: string;
    categories: string[];
    authors: string[] | undefined;
    description: string | undefined;
  };
}


let selectBook: Book = {} as Book

const Home = observer(() => {
  const [bookPage, setBookPage] = useState(true);

  const getSelectBook = (id:string):void=>{
  bookStore.booksList.forEach((book)=>{
    if(book.etag === id) {
      selectBook = {
        ...book,
      }
    }
  })
  }

  const bookHandler = () => {
    setBookPage(!bookPage);
  };

  const moreBooks = () => {
    bookStore.loadMoreBooks();
  };

  return (
    <main className="flex flex-col min-h-fit w-full items-center justify-start">
      {bookPage ? (
        bookStore.booksList.length > 0 ? (
          <div className="flex flex-col">
            <ul className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-4 md:px-10 py-6 md:py-8 max-[420px]:grid-cols-1">
              {bookStore.booksList.map((book: Book) => (
                <li className="bg-slate-300 p-4 rounded-md  duration-300 hover:shadow-black hover:shadow-2xl " key={book.etag}>
                  <Link
                    className="flex flex-col items-start justify-start h-full"
                    href="#"
                    onClick={()=>{
                      getSelectBook(book.etag)
                      bookHandler()
                    }}
                  >
                    <Image
                      className="w-auto h-36 rounded-lg mb-8 mx-auto shadow-lg block shadow-black"
                      src={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.smallThumbnail
                          : undefImg
                      }
                      alt={book.volumeInfo.title}
                      width={100}
                      height={150}
                    />
                    <span className="text-xs text-slate-400 underline mb-2">{book.volumeInfo.categories? book.volumeInfo.categories[0] : 'unwnown'}</span>
                    <p className="font-bold text-xs mb-4">
                      {book.volumeInfo.title}
                    </p>
                    <span className="text-xs text-slate-400 mt-auto">
                      Author:
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors.map((author)=>(<span key={author}>{author}.</span>))
                        : "unknown"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="p-4 bg-slate-300 rounded-md border border-black max-w-sm mb-4 mx-auto duration-300 hover:opacity-30"
              onClick={moreBooks}
            >
              more..
            </button>
          </div>
        ) : (
          <div className="w-full h-96 bg-gray-300">
            { bookstore.timeout ?  <div className={`text-center text-xl text-slate-600 mt-16 animate-bounce`}>please wait...</div> : ''}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center p-4 md:p-10 align-top w-full">
          <button className="p-4 mb-4 md:mb-8  border border-black bg-slate-300 duration-300 hover:opacity-30" onClick={bookHandler}>back</button>
          <div className="grid grid-cols-1 gap-4 md:gap-10 border border-slate-500 p-4 w-full md:grid-cols-2">
            <div className="bg-slate-300 p-4 flex items-center justify-center">
              <Image className="w-1/3 h-auto rounded-lg shadow-lg shadow-black" src={selectBook.volumeInfo.imageLinks ? selectBook.volumeInfo.imageLinks.smallThumbnail : imgUnd} alt={selectBook.volumeInfo.title} width={150} height={250}></Image>
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="text-slate-400 text-xs mb-4 md:mb-8">{selectBook.volumeInfo.categories ? selectBook.volumeInfo.categories : 'no category'}</span>
              <p className="text-xs md:text-xl mb-4 md:mb-8 font-bold">{selectBook.volumeInfo.title}</p>
              <span className="text-slate-300 text-xs underline italic border-slate-300 mb-4 md:mb-8">{selectBook.volumeInfo.authors ? selectBook.volumeInfo.authors : 'undefined'}</span>
              <div className="h-fit border text-xs md:text-xl w-full italic border-slate-500 p-4 mt-auto">{selectBook.volumeInfo.description ? selectBook.volumeInfo.description : 'no description' }</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
});

export default Home;
