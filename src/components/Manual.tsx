import { useState } from "react"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { storage } from "../contracts/Storage"

const Manual = () => {
    const [value, setValue] = useState(0)

    const { data: readData } = useReadContract({
        address: `0x${storage.address}`,
        abi: storage.abi,
        functionName: "retrieve"
    })

    const { data, error, isPending, isError, writeContract } = useWriteContract();

    const {
        data: receipt,
        isLoading,
        isSuccess,
      } = useWaitForTransactionReceipt({ hash: data });

    console.log("loading", isLoading)
    console.log("success", isSuccess)
    console.log("txn receipt", receipt)



    return (
        <>
            <hr />

            <h4>Connect Wallet</h4>

            <w3m-button />

            <hr />

            <h4>Value from contract</h4>
            <p>{Number(readData)}</p>

            <hr />

            <h4>Write to contract</h4>
            {
                isError &&
                <p style={{ color: "red" }}>{error?.name}</p>
            }
            <input
                onChange={(e) => setValue(parseInt(e.target.value))}
                type="number"
                value={value}
            />
            <button
                disabled={isPending}
                onClick={() =>
                    writeContract({
                        abi: storage.abi,
                        address: `0x${storage.address}`,
                        functionName: "store",
                        args: [BigInt(value)],
                    })
                }
            >
                Write
            </button>

            {
                receipt &&
                <p>
                    Last Txn Hash: {receipt.blockHash}
                </p>
            }

        </>
    )
}


export default Manual