"use client";
import bookStore from "./store/bookStore";
import Image from "next/image";
import imgUnd from './image/undefinedImg.png'
import {observer} from "mobx-react-lite";
import Link from "next/link";
import {useState} from "react";

import undefImg from "./image/undefinedImg.png";

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

// interface AdditionalInfo {
//   description: string;
// }

// type BookWithAdditionalInfo = Book & AdditionalInfo;


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
    console.log(selectBook);
    
  })
  }

  const bookHandler = () => {
    setBookPage(!bookPage);
  };

  const moreBooks = () => {
    bookStore.loadMoreBooks();
  };

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-start">
      {bookPage ? (
        bookStore.booksList.length > 0 ? (
          <div className="flex flex-col">
            <ul className="w-full grid grid-cols-4 gap-4 px-10 py-8">
              {bookStore.booksList.map((book: Book) => (
                <li className="bg-slate-300 p-4 rounded-md" key={book.etag}>
                  <Link
                    className="flex flex-col items-start justify-start h-full"
                    href="#"
                    onClick={()=>{
                      getSelectBook(book.etag)
                      bookHandler()
                    }}
                  >
                    <Image
                      className="w-auto h-36 mb-8 mx-auto shadow-lg block shadow-black"
                      src={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.smallThumbnail
                          : undefImg
                      }
                      alt={book.volumeInfo.title}
                      width={100}
                      height={150}
                    />
                    <span className="font-bold text-xs mb-4">
                      {book.volumeInfo.title}
                    </span>
                    <span className="text-xs text-slate-400 mt-auto">
                      Author:
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors[0]
                        : "unknown"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="p-4 bg-slate-300 rounded-md border border-black max-w-sm mb-4 mx-auto"
              onClick={moreBooks}
            >
              more..
            </button>
          </div>
        ) : (
          <div className="w-full h-screen bg-gray-300"></div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center px-10 align-top w-full">
          <button className="p-4 my-8  border border-black" onClick={bookHandler}>back</button>
          <div className="grid grid-cols-2 gap-10 border border-slate-500 p-4 w-full">
            <div className="p-2 bg-slate-900/10 flex items-center justify-center">
              <Image src={selectBook.volumeInfo.imageLinks ? selectBook.volumeInfo.imageLinks.smallThumbnail : imgUnd} alt={selectBook?.volumeInfo.title} width={150} height={250}></Image>
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="text-slate-400 text-xs mb-8">{selectBook.volumeInfo.categories ? selectBook.volumeInfo.categories : 'no category'}</span>
              <p className="text-xl mb-8 font-bold">{selectBook.volumeInfo.title}</p>
              <span className="text-slate-300 text-xs underline italic border-slate-300 mb-8">{selectBook.volumeInfo.authors ? selectBook.volumeInfo.authors : 'undefined'}</span>
              <div className="h-fit border w-full italic border-slate-500 p-4 mt-auto">{selectBook.volumeInfo.description ? selectBook.volumeInfo.description : 'no description' }</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
});

export default Home;
