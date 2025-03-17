import { Search, Filter, PlusCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function BooksPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg border shadow-sm p-6 transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Books List</h2>
            <p className="text-muted-foreground text-sm mt-1">Browse and borrow from our collection</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search books..." className="pl-8 w-full" />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>

              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Add Book</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto rounded-md border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Book Title</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Author</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Category</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Availability</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr
                  key={book.id}
                  className={`border-b transition-colors hover:bg-muted/30 ${index % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-9 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-medium text-foreground hover:text-primary transition-colors">
                        <Link href={`/books/${book.id}`} className="hover:underline">
                          {book.title}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{book.author}</td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="font-normal">
                      {book.category}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={book.available ? "success" : "destructive"} className="font-normal">
                      {book.available ? "Available" : "Borrowed"}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button size="sm" disabled={!book.available} className="transition-all">
                      Borrow
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 bg-card hover:bg-muted/10 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={ "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    <Link href={`/books/${book.id}`} className="hover:text-primary hover:underline transition-colors">
                      {book.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="font-normal text-xs">
                      {book.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t">
                <Badge variant={book.available ? "success" : "destructive"} className="font-normal">
                  {book.available ? "Available" : "Borrowed"}
                </Badge>
                <Button size="sm" disabled={!book.available}>
                  Borrow
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-muted-foreground">Showing 1-10 of 42 books</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="rounded-full px-4">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-4">
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

// Sample data
const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    available: true,
    coverImage: "https://i.pinimg.com/474x/aa/36/76/aa36763b11782f44ac990be57977e540.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    available: false,
    coverImage: "https://i.pinimg.com/474x/aa/36/76/aa36763b11782f44ac990be57977e540.jpg",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    available: true,
    coverImage: "https://i.pinimg.com/474x/aa/36/76/aa36763b11782f44ac990be57977e540.jpg",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    available: true,
    coverImage: "https://i.pinimg.com/474x/aa/36/76/aa36763b11782f44ac990be57977e540.jpg",
  },
  {
    id: 5,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    available: false,
    coverImage: "https://i.pinimg.com/474x/aa/36/76/aa36763b11782f44ac990be57977e540.jpg",
  },
]

