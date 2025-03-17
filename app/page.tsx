import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="mb-10">
        <div className="bg-card rounded-lg border shadow-sm p-6 transition-all hover:shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Welcome to the Library</h2>
          <p className="text-muted-foreground mb-4">
            Browse our extensive collection of books across various categories. Use the navigation above to explore
            books or check your borrowed items.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/books">Browse Books</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/borrowed" className="flex items-center gap-1">
                My Borrowed Books
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-5">Book Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-card rounded-lg border overflow-hidden transition-all hover:shadow-md"
            >
              <div className="relative h-40">
                <Image
                  // src={category.image || "https://i.pinimg.com/474x/aa/36/76/aa36763b11782f44ac990be57977e540.jpg"}
                  alt={category.name}
                  fill
                  src={category.image}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-medium text-lg text-white">{category.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground text-sm">{category.bookCount} books</p>
                  <span className="text-primary text-sm font-medium group-hover:underline">Explore</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

// Sample data
const categories = [
  {
    id: "fiction",
    name: "Fiction",
    bookCount: 1245,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    bookCount: 867,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
},
  {
    id: "science",
    name: "Science",
    bookCount: 543,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "history",
    name: "History",
    bookCount: 328,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
  },
]

