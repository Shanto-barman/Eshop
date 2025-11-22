// import React from 'react'

// function Cart() {
//   return (
//     <div className='pt-30'>
//         Cart
      
//     </div>
//   )
// }

// export default Cart
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function ProductCard() {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
<Card className="max-w-sm w-full">
<CardHeader>
<CardTitle>Sample Product</CardTitle>
<CardDescription>
This is a demo product card created from your shared card.jsx component.
</CardDescription>
</CardHeader>


<CardContent>
<img
src="http://localhost:8000/api/v1/product/getallproducts"
alt="Product"
className="rounded-lg mb-4 w-full"
/>


<p className="text-lg font-semibold">$29.99</p>
<p className="text-sm text-muted-foreground mt-1">
High‑quality product description goes here.
</p>
</CardContent>


<CardFooter className="flex justify-between">
<Button>Add to Cart</Button>
<Button variant="outline">View</Button>
</CardFooter>
</Card>
</div>
);
}

