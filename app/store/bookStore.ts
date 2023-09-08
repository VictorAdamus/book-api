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
      publishedDate: string;
    };
  }
  

class BooksStore {
    titleBook:string = ''
    booksList: Book[] = [];
    booksCount: number = 0;
    bookPage: Book | undefined = undefined;
    startIndex: number = 0
    bookCategory: string = 'All'
    constructor(){
        makeAutoObservable(this, {}, {deep: true})
    }

   

    setTitleBook(payload:string){
        this.titleBook = payload.trim().split(' ').join('-')
    }

    selectCategory(payload:string){
        this.bookCategory = payload
    }

    async fetchBooks(){
        try {
            const response = await axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${this.titleBook}&startIndex=0&maxResults=30&printType=books&filter=full&key=AIzaSyD5WLMaiuW-Dih_L3vmypVHv8max2_-vmU`)
            console.log(response.data.items);
            
            if (this.bookCategory !== 'All'){
              
                
                const res = response.data.items.filter((book:Book)=>book.volumeInfo.categories && (book.volumeInfo.categories[0] === this.bookCategory) )
                this.setSearchResults(res)
            } else if(this.bookCategory == 'All') {
                const res = [...response.data.items]
                
                this.setSearchResults(res)
            }

        } catch (error) {
            console.error(error)
        }
    };

    async loadMoreBooks(){
        console.log('loadMoreeee',this.bookCategory);
        
        try {
            const response = await axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${this.titleBook}&startIndex=${this.startIndex}&maxResults=30&printType=books&filter=full&key=AIzaSyD5WLMaiuW-Dih_L3vmypVHv8max2_-vmU`)
            if (this.bookCategory !== 'All'){
                const res = response.data.items.filter((book:Book)=>book.volumeInfo.categories && (book.volumeInfo.categories[0] === this.bookCategory) )
                this.booksList = [...this.booksList, ...res];
            } else if(this.bookCategory == 'All') {
                const res = response.data.items
                this.booksList = [...this.booksList, ...res];
            }
            this.startIndex +=30
            this.booksCount = this.booksList.length
        } catch (error) {
            this.booksList = []
            console.error(error)
        }
    }

    setSearchResults(result: Book[]){
        this.booksList = result
        this.startIndex = this.booksList.length
        this.booksCount = this.booksList.length
    }

    sortingBooks(payload:string){
        if(payload === 'newest') {
            this.booksList.sort((bookA:Book, bookB:Book)=>{
                const a = bookA.volumeInfo.publishedDate
                const numA = parseInt(a.replace(/-/g, ""))
                const b = bookB.volumeInfo.publishedDate
                const numB = parseInt(b.replace(/-/g, ""))
                return numB - numA
            })
        } else if(payload === 'alphabet'){
            this.booksList.sort((bookA:Book, bookB:Book)=>(bookA.volumeInfo.title > bookB.volumeInfo.title ? 1 : -1)
            )
        }
        console.log(this.booksList);
        
    }
    
}

const bookstore =  new BooksStore()
export default bookstore




