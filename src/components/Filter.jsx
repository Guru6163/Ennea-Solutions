import React from "react";
import { Input,Button } from "antd";

function Filter({ filter, setFilter }) {
  return (
    <span style={{display:"flex",marginBottom:"10px"}}>
      <Input placeholder="Search By Any Field" style={{width:"15%",}} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
      <Button type="primary">Search</Button>
    </span>
  );
}

export default Filter;
