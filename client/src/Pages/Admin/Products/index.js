import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { deleteProduct, fetchProductList } from "../../../api";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { Popconfirm, Table } from "antd";
import { NavLink } from "react-router-dom";


function AdminProducts() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    fetchProductList
  );
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteProduct, {
    onMutate: (productId) => {
      console.log("Deleting product with ID:", productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("admin:products");
    },
  });

  const columns = useMemo(() => {
    return [
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Price", dataIndex: "price", key: "price" },
      { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <NavLink to={`/admin/products/${record._id}`}>Edit</NavLink>
            <Popconfirm
              title={"Are you sure?"}
              onConfirm={() => {
                deleteMutation.mutate(record._id);
              }}
              onCancel={() => console.log("cancelled")}
              okText={"Yes"}
              cancelText={"No"}
              placement={"left"}
            >
            <Link border={"1px"} textDecor={"none!important"} _hover={{color: "white"}} px={4} py={2} ml={3} bg={"red.400"} color={"white"}  borderRadius={"lg"} cursor={"pointer"}>Delete</Link>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, [deleteMutation]);

  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const dataSource = data;
  return (
    <div>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={"2xl"}>Products</Text>
        <NavLink to={"/admin/products/new"}>
          <Button colorScheme="yellow">Add New Product</Button>
        </NavLink>
      </Flex>
      <Table dataSource={dataSource} columns={columns} rowKey={"_id"}></Table>
    </div>
  );
}

export default AdminProducts;
