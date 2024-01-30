import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import  toast  from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

interface DiscountType {
  _id: string;
  coupon: string;
  amount: number;
}

const columns: Column<DiscountType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Coupon",
    accessor: "coupon",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
];
const Coupon = () => {
  
  const [rows, setRows] = useState<DiscountType[]>([]);
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const navigate= useNavigate();
  const [coupon, setCoupon] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.userReducer);
  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return toast.error("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  const CreateCouponHandler =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestData = {
      coupon: couponCode,
      amount: amount.toString(),
    };
  
    const res = await axios.post(`http://localhost:4000/api/v1/payment/coupon/new?id=${user?._id}`, requestData);

    responseToast(res, navigate, "/admin/app/coupon");
  }

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await axios.get<{ success: boolean, coupons: DiscountType[] }>(`http://localhost:4000/api/v1/payment/coupon/all?id=${user?._id}`);
        const fetchedData = response.data;
        console.log(fetchedData)  
        if (fetchedData.success) {
          setRows(
            fetchedData.coupons.map((coupon) => ({
              _id: coupon._id,
              coupon: coupon.coupon, // Assuming the coupon code is stored in the 'code' property
              amount: coupon.amount
            }))
          );
        } else {
          // Handle the case where the API response indicates an error
          console.error("Error fetching data:", fetchedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed (e.g., display an error message)
      }
      setIsCopied(false);
    };
  
    fetchCoupon();
  }, [coupon, user?._id]);
  


  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupons</h1>
        <section>
          <form className="coupon-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset>
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span>Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>
            </fieldset>
            <button type="submit">Generate</button>
          </form>
          {coupon && (
            <code>
              {coupon}{" "}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>{" "}
            </code>
          )}
        <form className="coupon-code-form" onSubmit={CreateCouponHandler}>
          
            <input
              type="text"
              name="coupon"
              placeholder="Enter the Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              maxLength={size}
            />

            <input
              type="number"
              name="amount"
              placeholder="Coupon Length"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <button type="submit">Create Coupon</button>
          </form>
        </section>
        <section>
        </section>
      </main>
    </div>
  );
};

export default Coupon;
