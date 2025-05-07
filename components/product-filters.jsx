"use client"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterIcon } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function ProductFilters({
  onCategoryChange,
  onPriceRangeChange,
  onConditionChange,
  activeCategory,
  priceRange,
  condition,
}) {
  const isMobile = useMobile()
  const categories = ["Men", "Women", "Kids", "All Genders", "Accessories"]
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"]

  const handlePriceChange = (value) => {
    onPriceRangeChange([value[0], value[1]])
  }

  const handleReset = () => {
    onCategoryChange(null)
    onPriceRangeChange([0, 1000])
    onConditionChange(null)
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => onCategoryChange(activeCategory === cat ? null : cat)}
              className={activeCategory === cat ? "bg-sfsu-teal" : ""}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h3>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          max={1000}
          step={5}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="my-6"
        />
      </div>

      <div>
        <h3 className="font-medium mb-3">Condition</h3>
        <Select value={condition || ""} onValueChange={(value) => onConditionChange(value || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any condition</SelectItem>
            {conditions.map((cond) => (
              <SelectItem key={cond} value={cond}>
                {cond}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon size={16} />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Filter products by category, price, and condition</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <FiltersContent />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return <FiltersContent />
}
