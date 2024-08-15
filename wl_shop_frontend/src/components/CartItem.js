function CartItem({ item, updateQuantity }) {
    return (
      <tr>
        <td>{item.name}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          {item.quantity}
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </td>
        <td>${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    );
  }