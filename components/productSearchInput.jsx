"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleSearch } from "./action";
function SearchInput({currentPage,initialSearch}) {
  const [search, setSearch] = useState(initialSearch);
  return (
    <div className="flex gap-2">
      <Input onChange={(e)=>{setSearch(e.target.value)}} value={search}  placeholder="搜索商品" />
      <Button onClick={()=>{handleSearch(currentPage,search)}}>搜索</Button>
    </div>
  );
}

export default SearchInput;