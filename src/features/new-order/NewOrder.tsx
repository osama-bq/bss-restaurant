import { useState } from "react";
import { Stack } from "@mui/material";
import { useGetTablesQuery } from "../../api/tables.api";
import type { Table } from "../tables/types";
import TableSelector from "./components/TableSelector";
import EmptyTableState from "./components/EmptyTableState";
import FoodMenu from "./components/FoodMenu";
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";
import { useOrderCart } from "./hooks/useOrderCart";
import type { OrderMutationPayload } from "../orders/types";
import { useCreateOrderMutation } from "../../api/orders.api";

const TABLES_PER_PAGE = 50; // fetch all

const generateUniqueOrderNumber = (tableNumber: string) => {
  const now = Date.now();
  const year = new Date(now).getFullYear().toString().slice(-2);
  const month = (new Date(now).getMonth() + 1).toString().padStart(2, "0");
  const day = new Date(now).getDate().toString().padStart(2, "0");
  const timestamp = now.toString().slice(-4);
  return `${year}${month}${day}-${tableNumber}-${timestamp}`;
};

export default function NewOrderPage() {
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const {
    data: tablesResponse,
    isLoading: tablesLoading,
    error: tablesError,
    refetch,
  } = useGetTablesQuery({
    Page: 1,
    Per_Page: TABLES_PER_PAGE,
  });

  const tables = tablesResponse?.data ?? [];

  const selectedTable =
    tables.find((table) => table.id === selectedTableId) ?? null;

  const [cartOpen, setCartOpen] = useState(false);
  const [phone, setPhone] = useState("");

  const { items, addItem, decreaseItem, totalItems, subtotal, clearCart } =
    useOrderCart(selectedTableId);

  const [createOrder, createOrderState] = useCreateOrderMutation();

  const handleSelectTable = (table: Table) => {
    setSelectedTableId(table.id);
    setCartOpen(false);
    setPhone("");
  };

  const handlePlaceOrder = async () => {
    if (!selectedTable || items.length === 0 || createOrderState.isLoading) {
      return;
    }

    if (
      items.some(
        (item) => !Number.isInteger(item.quantity) || item.quantity <= 0,
      )
    ) {
      return;
    }

    const payload: OrderMutationPayload = {
      tableId: selectedTable.id,
      orderNumber: generateUniqueOrderNumber(selectedTable.tableNumber),
      amount: subtotal,
      phoneNumber: phone.trim() || null,
      items: items.map((item) => {
        const unitPrice = item.food.discountPrice ?? item.food.price;

        return {
          foodId: item.food.id,
          foodPackageId: null,
          quantity: item.quantity,
          unitPrice,
          totalPrice: unitPrice * item.quantity,
        };
      }),
    };

    try {
      await createOrder(payload).unwrap();
      setCartOpen(false);
      setPhone("");
      clearCart();
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <>
      <Stack spacing={2.5}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2.5}
          sx={{
            alignItems: "stretch",
          }}
        >
          <Stack
            sx={{
              width: {
                xs: "100%",
                md: 250,
              },
              height: { md: "calc(100vh - 150px)" },
              flexShrink: 0,
            }}
          >
            <TableSelector
              tables={tables}
              selectedTableId={selectedTableId}
              isLoading={tablesLoading}
              error={tablesError}
              onSelect={handleSelectTable}
              onRetry={refetch}
            />
          </Stack>

          <Stack
            sx={{
              minWidth: 0,
              flexGrow: 1,
            }}
          >
            {selectedTableId ? (
              <FoodMenu
                table={selectedTable}
                totalItems={totalItems}
                subtotal={subtotal}
                cartItems={items}
                onAdd={addItem}
                onDecrease={decreaseItem}
              />
            ) : (
              <EmptyTableState />
            )}
          </Stack>
        </Stack>
      </Stack>

      {selectedTable && (
        <>
          <CartButton
            itemCount={totalItems}
            subtotal={subtotal}
            onClick={() => setCartOpen(true)}
          />

          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            table={selectedTable}
            items={items}
            subtotal={subtotal}
            phone={phone}
            onPhoneChange={setPhone}
            onAdd={(foodId) => {
              const item = items.find(
                (cartItem) => cartItem.food.id === foodId,
              );

              if (item) {
                addItem(item.food);
              }
            }}
            onDecrease={decreaseItem}
            onPlaceOrder={handlePlaceOrder}
          />
        </>
      )}
    </>
  );
}
