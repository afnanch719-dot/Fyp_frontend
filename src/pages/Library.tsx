import { useState } from "react";
import { Search, Filter, Grid, List, Upload, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Library = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Classic Literature",
      format: "EPUB",
      progress: 75,
      coverColor: "from-blue-500 to-purple-600",
      pages: 180,
      language: "English",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      category: "Science Fiction",
      format: "PDF",
      progress: 45,
      coverColor: "from-red-500 to-orange-600",
      pages: 328,
      language: "English",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Classic Literature",
      format: "EPUB",
      progress: 90,
      coverColor: "from-green-500 to-teal-600",
      pages: 281,
      language: "English",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Romance",
      format: "DOCX",
      progress: 30,
      coverColor: "from-pink-500 to-rose-600",
      pages: 279,
      language: "English",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      category: "Fantasy",
      format: "EPUB",
      progress: 60,
      coverColor: "from-amber-500 to-yellow-600",
      pages: 310,
      language: "English",
    },
    {
      id: 6,
      title: "Brave New World",
      author: "Aldous Huxley",
      category: "Science Fiction",
      format: "TXT",
      progress: 0,
      coverColor: "from-cyan-500 to-blue-600",
      pages: 268,
      language: "English",
    },
  ];

  const categories = ["All", "Classic Literature", "Science Fiction", "Romance", "Fantasy"];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Your Library</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your book collection</p>
        </div>
        <div className="flex gap-2">
          <Button className="btn-accessible">
            <Upload className="mr-2 h-5 w-5" />
            Upload Book
          </Button>
          <Button variant="outline" className="btn-accessible">
            <Plus className="mr-2 h-5 w-5" />
            Add New
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search books by title or author..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search books"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px] h-12">
                <SelectValue placeholder="Filter by format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="epub">EPUB</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="docx">DOCX</SelectItem>
                <SelectItem value="txt">TXT</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                className="h-12 w-12"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                className="h-12 w-12"
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="text-sm md:text-base py-3"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            {/* Books Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks
                  .filter((book) => category === "All" || book.category === category)
                  .map((book) => (
                    <Card key={book.id} className="card-hover cursor-pointer group">
                      <div className={`h-48 bg-gradient-to-br ${book.coverColor} rounded-t-lg relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{book.format}</Badge>
                          <Badge variant="outline">{book.pages} pages</Badge>
                        </div>
                        {book.progress > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{book.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${book.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        <Button className="w-full btn-accessible" size="lg">
                          {book.progress > 0 ? "Continue Reading" : "Start Reading"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBooks
                  .filter((book) => category === "All" || book.category === category)
                  .map((book) => (
                    <Card key={book.id} className="card-hover cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-24 bg-gradient-to-br ${book.coverColor} rounded flex-shrink-0`} />
                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="font-bold text-lg">{book.title}</h3>
                              <p className="text-sm text-muted-foreground">{book.author}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">{book.format}</Badge>
                              <Badge variant="outline">{book.category}</Badge>
                              <Badge variant="outline">{book.pages} pages</Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {book.progress > 0 && (
                              <span className="text-sm font-medium">{book.progress}%</span>
                            )}
                            <Button className="btn-accessible">
                              {book.progress > 0 ? "Continue" : "Start"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Library;
