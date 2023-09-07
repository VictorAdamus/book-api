import { makeAutoObservable } from "mobx"
import axios from "axios";

interface Book {
    etag: string;
    volumeInfo: {
      imageLinks: { smallThumbnail: string,
        };
      title: string;
      categories: string[];
      authors: string[] | undefined;
      description: string;
    };
  }
  

class Books {
    titleBook:string = ''
    booksList: Book[] = [];
    booksCount: number = 0;
    bookPage: Book | undefined = undefined;
    startIndex: number = 0
    constructor(){
        makeAutoObservable(this, {}, {deep: true})
    }

    setSearchResults(result: Book[]){
        this.booksList = result
        this.startIndex = result.length
        this.booksCount = this.booksList.length
    }

    setTitleBook(payload:string){
        this.titleBook = payload.trim().split(' ').join('-')
    }

    async fetchBooks(){
        try {
            const response = await axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${this.titleBook}&startIndex=0&maxResults=30&printType=books&filter=full&key=AIzaSyD5WLMaiuW-Dih_L3vmypVHv8max2_-vmU`)
            this.setSearchResults(response.data.items)
        } catch (error) {
            console.error(error)
        }
    };

    async loadMoreBooks(){
        try {
            const response = await axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${this.titleBook}&startIndex=${this.startIndex}&maxResults=30&printType=books&filter=full&key=AIzaSyD5WLMaiuW-Dih_L3vmypVHv8max2_-vmU`)
            this.booksList = [...this.booksList, ...response.data.items];
            this.startIndex +=30
            this.booksCount = this.booksList.length
        } catch (error) {
            this.booksList = []
            console.error(error)
        }
    }
    // bookPageRender(payload:string){
    //     console.log(payload);
    //     console.log( this.booksList);
       
    //    const bookIndex =  this.booksList.findIndex((book)=>book.etag === payload)
    //     console.log(bookIndex);
    //     console.log(this.booksList[bookIndex]);
        
        
    //    if(bookIndex > -1) {
    //     this.bookPage = this.booksList[bookIndex]
    //     console.log('this book page',this.bookPage);
    //    }
    // }

}


const bookStore = new Books
export default bookStore




