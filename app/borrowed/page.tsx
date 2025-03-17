import { Search, Filter, BookMarked } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function BorrowedPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg border shadow-sm p-6 transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Borrowed Books</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage your current loans</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search borrowed books..." className="pl-8 w-full" />
            </div>

            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        {borrowedBooks.length === 0 ? (
          <div className="text-center py-16 px-4 border rounded-lg bg-muted/10">
            <div className="bg-primary/10 text-primary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookMarked className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-foreground">No books borrowed</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              You haven't borrowed any books yet. Browse our collection and find something interesting to read.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/books">Browse Books</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-md border">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Book Title</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Author</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Borrowed Date</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Due Date</th>
                    <th className="py-3 px-4 text-right font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book, index) => {
                    const isOverdue = new Date(book.dueDate) < new Date()

                    return (
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
                        <td className="py-4 px-4 text-muted-foreground">{formatDate(book.borrowedDate)}</td>
                        <td className="py-4 px-4">
                          <span className={`${isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                            {formatDate(book.dueDate)}
                            {isOverdue && (
                              <Badge variant="destructive" className="ml-2">
                                Overdue
                              </Badge>
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="transition-all hover:bg-primary hover:text-primary-foreground"
                          >
                            Return
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {borrowedBooks.map((book) => {
                const isOverdue = new Date(book.dueDate) < new Date()

                return (
                  <div key={book.id} className="border rounded-lg p-4 bg-card hover:bg-muted/10 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          <Link
                            href={`/books/${book.id}`}
                            className="hover:text-primary hover:underline transition-colors"
                          >
                            {book.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <div className="flex flex-col mt-2">
                          <span className="text-xs text-muted-foreground">
                            Borrowed: {formatDate(book.borrowedDate)}
                          </span>
                          <span
                            className={`text-xs ${isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}`}
                          >
                            Due: {formatDate(book.dueDate)}
                            {isOverdue && (
                              <Badge variant="destructive" className="ml-2 text-xs">
                                Overdue
                              </Badge>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2 pt-2 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        className="transition-all hover:bg-primary hover:text-primary-foreground"
                      >
                        Return
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

// Helper function to format dates
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Sample data
const borrowedBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    borrowedDate: "2023-03-01",
    dueDate: "2023-03-15",
    coverImage: "/placeholder.svg?height=48&width=36",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    borrowedDate: "2023-03-05",
    dueDate: "2023-03-19",
    coverImage: "/placeholder.svg?height=48&width=36",
  },
  {
    id: 3,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    borrowedDate: "2023-02-20",
    dueDate: "2023-03-06",
    coverImage: "/placeholder.svg?height=48&width=36",
  },
]

