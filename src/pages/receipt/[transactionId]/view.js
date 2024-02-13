import React, {useEffect, useState} from 'react'
import { useRouter } from "next/router";
import Footer from '@/components/footer/Footer';
import axios from 'axios';
import moment from 'moment';
import { ScaleLoader } from 'react-spinners';

const View = () => {
    const router = useRouter();
    const [receipt, setReceipt] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { transactionId } = router.query;
    const api_token = localStorage.getItem('api_token')

    const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
    const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

    setTimeout(() => {
        setIsLoading(false)
      }, 2000);

    useEffect(() => {
        const viewReceipt = async () => {
          try {
            if (transactionId) {
              const response = await axios.get(`${baseApiRoute}/order/receipt/${transactionId}/view`, {
                headers: {
                  Authorization: `Bearer ${api_token}`,
                },
              });
    
              setReceipt(response.data.order);
            //   console.log(response.data.order);
            }
          } catch (error) {
            // console.log(error);
            setReceipt(null);
          }
        };
    
        viewReceipt();
      }, [transactionId]);

    // if(receipt) {
        return (
            <div>
                {isLoading
                    ?   <div className="w-full flex flex-col gap-6 items-center justify-center h-screen py-20 text-xl font-bold">
                            <p>Your receipt is loading...</p>
                            <ScaleLoader color="#F59E0B" size={40} />
                        </div>

                    :   <>
                            {receipt
                                ?   <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6" id="invoice">
                        
                                        <div className="grid grid-cols-2 items-center">
                                            <div>
                                                {/* Company logo */}
                                                <img src="https://companieslogo.com/img/orig/AMZN-e9f942e4.png?t=1632523695" alt="company-logo" height="100" width="100" />
                                            </div>
                            
                                            <div className="text-right">
                                                <p>
                                                Solar Ecom
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                solarecom.com
                                                </p>
                                                <p className="text-gray-500 text-sm mt-1">
                                                +1(414)414-4141
                                                </p>
                                                <p className="text-gray-500 text-sm mt-1">
                                                support.solarecom@gmail.com
                                                </p>
                                            </div>
                                        </div>
                        
                                        {/* Client info */}
                                        <div className="grid grid-cols-2 items-center mt-8">
                                            <div>
                                                <p className="font-bold text-gray-800">
                                                Bill to :
                                                </p>
                                                <p className="text-gray-500">
                                                {receipt?.user?.name} 
                                                <br />
                                                102, San-Fransico, CA, USA
                                                </p>
                                                <p className="text-gray-500">
                                                {receipt?.user?.email}
                                                </p>
                                            </div>
                                
                                            <div className="text-right">
                                                <p className="">
                                                Receipt number:
                                                <span className="text-gray-500 "> {receipt?.transaction_id}</span>
                                                </p>
                                                <p>
                                                Receipt id:<span className="text-gray-500"> {receipt?.id}</span>
                                                <br />
                                                Receipt date: <span className="text-gray-500"> {moment(receipt?.created_at).format("DD MMM YYYY")}</span>
                                                </p>
                                            </div>
                                        </div>
                        
                                        {/* Invoice Items */}
                                        <div className="-mx-4 mt-8 flow-root sm:mx-0">
                                            <table className="min-w-full">
                                                <colgroup>
                                                    <col className="w-full sm:w-1/2" />
                                                    <col className="sm:w-1/6" />
                                                    <col className="sm:w-1/6" />
                                                    <col className="sm:w-1/6" />
                                                </colgroup>
                                                <thead className="border-b border-gray-300 text-gray-900">
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
                                                        <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Quantity</th>
                                                        <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Price</th>
                                                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
                                                    </tr>
                                                </thead>
                                                    {receipt?.products?.map((product) => (
                                                    <tbody key={product.id}>
                                                        <tr  className="border-b border-gray-200">
                                                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                <div className="font-medium text-gray-900">{product.title}</div>
                                                                <div className="mt-1 truncate text-gray-500">{product.description}</div>
                                                            </td>
                                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">{product?.pivot?.quantity}</td>
                                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">${product.price}</td>
                                                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">${product?.pivot?.quantity * product.price}</td>
                                                        </tr>
                                                    </tbody>
                                                    ))}
                        
                                                    <tfoot>
                                                        <tr>
                                                        <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Subtotal</th>
                                                        <th scope="row" className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
                                                        <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">${receipt?.total_amount}</td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Tax</th>
                                                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax</th>
                                                        <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">$00.00</td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Discount</th>
                                                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Discount</th>
                                                        <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0"> 0%</td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total</th>
                                                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
                                                        <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">${receipt?.total_amount}</td>
                                                        </tr>
                                                    </tfoot>
                                            </table>
                                        </div>
                                        <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                                            Thank you for shopping with Solar Ecom
                                        </div>
                                    </div>
                                    
                                :   <div className='flex items-center justify-center h-screen'>
                                        <h1 className='text-xl font-bold'>No data available</h1>
                                    </div>
                            } 
                        </>
                }
            </div>
            
          );
}

export default View