import React from "react";

const item = {
  categoryName: "Burger",
  productName: "Panner Tikki Burger",
  price: 450,
  quantity: 5,
  totallCost: 1500,
  itemTotal: 3400,
  deliveryCharge: 450,
  packagingCharge: 70,
  discount: 150,
  tax: 300,
};
const OrderDetailInvoice = () => {
  const {
    categoryName,
    deliveryCharge,
    discount,
    packagingCharge,
    productName,
    quantity,
    price,
    tax,
    totallCost,
    itemTotal,
  } = item;
  return (
    <div className="border border-stroke dark:border-strokedark">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[670px]">
          <div className="grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark">
            <div className="col-span-3">
              <h5 className="font-medium text-black dark:text-white">
                Category Name
              </h5>
            </div>
            <div className="col-span-4">
              <h5 className="font-medium text-black dark:text-white">
                Product Name
              </h5>
            </div>
            <div className="col-span-2">
              <h5 className="font-medium text-black dark:text-white">Price</h5>
            </div>
            <div className="col-span-2">
              <h5 className="font-medium text-black dark:text-white">
                Quantity
              </h5>
            </div>
            <div className="col-span-1">
              <h5 className="text-right font-medium text-black dark:text-white">
                Total Cost
              </h5>
            </div>
          </div>
          <div className="grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark">
            <div className="col-span-3">
              <p className="font-medium">{categoryName}</p>
            </div>
            <div className="col-span-4">
              <p className="font-medium">{productName}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium">Ksh {price}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium">{quantity}</p>
            </div>
            <div className="col-span-1">
              <p className="text-right font-medium">Ksh {totallCost}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-6">
        <div className="w-full max-w-65">
          <div className="flex flex-col gap-4">
            <p className="flex justify-between font-medium text-black dark:text-white">
              <span> Item Total </span>
              <span> Ksh {itemTotal} </span>
            </p>
            <p className="flex justify-between font-medium text-black dark:text-white">
              <span> Delivery Charge </span>
              <span> ksh {deliveryCharge} </span>
            </p>
            <p className="flex justify-between font-medium text-black dark:text-white">
              <span> Packaging Charge </span>
              <span> ksh {packagingCharge} </span>
            </p>
            <p className="flex justify-between font-medium text-black dark:text-white">
              <span>
                Discount<span className="text-meta-3">(10%)</span>
              </span>
              <span> Ksh {discount} </span>
            </p>
            <p className="flex justify-between font-medium text-black dark:text-white">
              <span>
                {" "}
                Tax <span className="text-red">(5%)</span>{" "}
              </span>
              <span> Ksh {tax} </span>
            </p>
          </div>
          <p className="mt-4 flex justify-between border-t border-stroke pt-5 dark:border-strokedark">
            <span className="font-medium text-black dark:text-white">
              Total Pay
            </span>
            <span className="font-bold text-meta-3"> Ksh 4475 </span>
          </p>
          <button className="float-right mt-10 inline-flex items-center gap-2.5 rounded bg-primary px-7.5 py-2.5 font-medium text-white hover:bg-opacity-90">
            Download
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1878_13706)">
                <path
                  d="M16.8754 12.375C16.5379 12.375 16.2285 12.6562 16.2285 13.0219V15.525C16.2285 15.7781 16.0316 15.975 15.7785 15.975H2.22227C1.96914 15.975 1.77227 15.7781 1.77227 15.525V13.0219C1.77227 12.6562 1.46289 12.375 1.12539 12.375C0.787891 12.375 0.478516 12.6562 0.478516 13.0219V15.525C0.478516 16.4812 1.23789 17.2406 2.19414 17.2406H15.7785C16.7348 17.2406 17.4941 16.4812 17.4941 15.525V13.0219C17.5223 12.6562 17.2129 12.375 16.8754 12.375Z"
                  fill=""
                ></path>
                <path
                  d="M8.55055 13.078C8.66305 13.1905 8.8318 13.2468 9.00055 13.2468C9.1693 13.2468 9.30992 13.1905 9.45054 13.078L13.5287 9.1124C13.7818 8.85928 13.7818 8.46553 13.5287 8.2124C13.2755 7.95928 12.8818 7.95928 12.6287 8.2124L9.64742 11.1374V1.40615C9.64742 1.06865 9.36617 0.759277 9.00055 0.759277C8.66305 0.759277 8.35367 1.04053 8.35367 1.40615V11.1374L5.37242 8.2124C5.1193 7.95928 4.72555 7.9874 4.47242 8.2124C4.2193 8.46553 4.24742 8.85928 4.47242 9.1124L8.55055 13.078Z"
                  fill=""
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1878_13706">
                  <rect width="18" height="18" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailInvoice;
