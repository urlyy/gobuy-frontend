import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

function SearchInput({className}) {
  return (
    <div className="flex gap-2">
      <Input placeholder="搜索商品" />
      <Button>搜索</Button>
    </div>
  );
}

export default SearchInput;