"use client";

import { useState } from "react";
import { useCart } from "../../CartContext";

type CartProduct = {
  name: string;
  articleNr: string;
  price?: string;
  inStock?: boolean;
};

export default function AddToCartPanel({
  product,
  onClose,
}: {
  product: CartProduct;
  onClose: () => void;
}) {
  const { carts, addToCart, createCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCart, setSelectedCart] = useState(carts[0]?.id ?? "");
  const [comment, setComment] = useState("");
  const [createNew, setCreateNew] = useState(false);
  const [newCartName, setNewCartName] = useState("");
  const [added, setAdded] = useState(false);

  const price = product.price ? parseInt(product.price.replace(/\s/g, "").replace("kr", "")) : null;

  function handleAdd() {
    let targetCartId = selectedCart;

    if (createNew && newCartName.trim()) {
      targetCartId = createCart(newCartName.trim());
    }

    addToCart(targetCartId, {
      articleNr: product.articleNr,
      name: product.name,
      qty: quantity,
      comment,
      inStock: product.inStock,
      netPrice: price ? price * 100 : undefined,
    });

    setAdded(true);
    setTimeout(() => onClose(), 1200);
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:w-[420px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#111]">Lägg till i varukorg</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f5f5f5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Product card */}
          <div className="mx-6 mt-5 rounded-xl border border-[#e5e5e5] p-4">
            <h3 className="text-[14px] font-semibold text-[#111]">{product.name}</h3>
            <p className="mt-0.5 text-[12px] text-[#888]">Art.nr: {product.articleNr}</p>

            {/* Quantity + stock */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-l-lg border border-[#d0d0d0] text-[#555] hover:bg-[#f5f5f5]"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-9 w-14 border-y border-[#d0d0d0] text-center text-[14px] font-semibold text-[#111] outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-r-lg border border-[#d0d0d0] text-[#555] hover:bg-[#f5f5f5]"
                >
                  +
                </button>
              </div>
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#2e7d32]">
                  <span className="h-2 w-2 rounded-full bg-[#2e7d32]" />
                  I lager
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#c44]">
                  <span className="h-2 w-2 rounded-full bg-[#c44]" />
                  Ej i lager
                </span>
              )}
            </div>

            {/* Price */}
            {price && (
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-[11px] text-[#999]">Totalt nettopris</span>
                <span className="text-[16px] font-bold text-[#111]">
                  {(price * quantity).toLocaleString("sv-SE")} kr
                  <span className="ml-1 text-[11px] font-normal text-[#999]">exkl. moms</span>
                </span>
              </div>
            )}
          </div>

          {/* Duplicate warning */}
          {carts.some((c) => c.id === selectedCart && c.items.some((i) => i.articleNr === product.articleNr)) && !createNew && (
            <div className="mx-6 mt-3 rounded-lg bg-[#fff3e0] px-4 py-2.5 text-[12px] font-semibold text-[#e65100]">
              Denna artikel finns redan i vald varukorg — kvantiteten kommer adderas.
            </div>
          )}

          {/* Cart selection */}
          <div className="px-6 pt-5">
            <p className="text-[13px] font-bold text-[#111]">Varukorg</p>
            <div className="mt-3 space-y-2">
              {carts.map((cart) => (
                <label
                  key={cart.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                    selectedCart === cart.id && !createNew
                      ? "border-[#273A60] bg-[#f0f3f8]"
                      : "border-[#e5e5e5] hover:border-[#ccc]"
                  }`}
                >
                  <input
                    type="radio"
                    name="cart"
                    checked={selectedCart === cart.id && !createNew}
                    onChange={() => { setSelectedCart(cart.id); setCreateNew(false); }}
                    className="h-4 w-4 accent-[#273A60]"
                  />
                  <span className="flex-1 text-[13px] font-medium text-[#333]">{cart.name}</span>
                  {cart.items.length > 0 && (
                    <span className="rounded-full bg-[#273A60] px-1.5 py-0.5 text-[10px] font-bold text-white">{cart.items.length}</span>
                  )}
                </label>
              ))}

              {/* Create new cart */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                  createNew
                    ? "border-[#273A60] bg-[#f0f3f8]"
                    : "border-[#e5e5e5] hover:border-[#ccc]"
                }`}
              >
                <input
                  type="radio"
                  name="cart"
                  checked={createNew}
                  onChange={() => setCreateNew(true)}
                  className="h-4 w-4 accent-[#273A60]"
                />
                <span className="flex-1 text-[13px] font-medium text-[#333]">Skapa ny varukorg</span>
              </label>

              {createNew && (
                <input
                  type="text"
                  value={newCartName}
                  onChange={(e) => setNewCartName(e.target.value)}
                  placeholder="Namn på ny varukorg..."
                  autoFocus
                  className="ml-7 h-9 w-[calc(100%-28px)] rounded-lg border border-[#d0d0d0] px-3 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="px-6 pt-5 pb-6">
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-bold text-[#111]">Lägg till en beställningsradskommentar</p>
              <span className="text-[11px] text-[#bbb]">{comment.length}/65</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 65))}
              placeholder="Kommentar (högst 65 tecken)"
              rows={2}
              className="mt-2 w-full resize-none rounded-lg border border-[#d0d0d0] px-3 py-2.5 text-[13px] text-[#333] placeholder-[#aaa] focus:border-[#273A60] focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-[#bbb]">(frivilligt)</p>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex gap-3 border-t border-[#e5e5e5] px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#d0d0d0] py-3 text-[13px] font-semibold text-[#555] transition-colors hover:bg-[#f5f5f5]"
          >
            Avbryt
          </button>
          <button
            onClick={handleAdd}
            disabled={added || (createNew && !newCartName.trim())}
            className={`flex-1 rounded-lg py-3 text-[13px] font-bold text-white transition-all ${
              added ? "bg-[#2e7d32]" : "bg-[#273A60] hover:bg-[#1a2d4d] disabled:opacity-50"
            }`}
          >
            {added ? "✓ Tillagd!" : "Lägg till i varukorg"}
          </button>
        </div>
      </div>
    </>
  );
}
