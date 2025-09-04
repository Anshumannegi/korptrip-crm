import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

// Styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: "Helvetica" },
  header: {
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    padding: 2,
  },
  title: { fontSize: 13, fontWeight: "bold", padding: 2 },
  section: { marginBottom: 10 },
  bold: { fontWeight: "bold" },
  table: { display: "table", width: "auto" },
  row: { flexDirection: "row" },
  headerText: { fontSize: 11, fontWeight: "semibold", padding: 2 },
  headingText: { fontSize: 9, fontWeight: "semibold", padding: 2 },
  simpleText: { fontSize: 9, padding: 2 },
  cell: {
    borderRightWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    paddingVertical: 1,
    paddingHorizontal: 3,
    fontSize: 8,
  },
  cellHeading: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    padding: 3,
    fontSize: 9,
  },
});

// PDF Document Component
const InvoiceDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        <Text style={{ fontSize: 9, fontWeight: "semibold" }}>
          CIN:U79120DL2023PTC422768
        </Text>
        <View style={styles.header}>
          <Text
            style={{
              textDecoration: "underline",
              fontWeight: "semibold",
              fontSize: 11,
            }}
          >
            {data.invoiceType}
          </Text>
          <Text style={styles.title}>KORPTRIP SERVICES PRIVATE LIMITED</Text>
          <Text style={styles.headerText}>
            110 - C 1st FLOOR JAINA TOWER 2 DISTRICT CENTRE JANAKPURI NEW
            DELHI-110058
          </Text>
          <Text style={styles.headerText}>
            REGD. OFF:RZC-1/65 VINOD PURI VIJAY ENCLAVE PALAM DABRI ROA, NEW
            DELHI -110045
          </Text>
          <Text style={styles.headerText}>
            CONTACT DETAILS :+91-8700030408 , info@korptrip.com,
            www.korptrip.com
          </Text>
          <Text style={styles.headerText}>GSTIN: 07AAKCK6412D1ZQ</Text>
        </View>

        {/* Party & Invoice Details */}

        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "black",
            borderStyle: "solid",
          }}
        >
          <View
            style={{
              borderRightWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
              flexGrow: 2,
            }}
          >
            <View style={{ height: 60 }}>
              <Text style={[styles.headingText, { padding: 2 }]}>
                Party Details: {data.partyName}
              </Text>
              <Text style={{ fontSize: 8, padding: 2 }}>
                Address: {data.partyAddress}
              </Text>
            </View>
            <View
              style={[
                {
                  borderTopWidth: 1,
                  borderColor: "black",
                  borderStyle: "solid",
                  height: 18,
                },
                styles.simpleText,
              ]}
            >
              <Text>
                PH:- +91 {data.partyPhoneNo} | Email ID: {data.partyEmail}
              </Text>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
                height: 18,
              }}
            >
              <Text style={styles.headingText}>
                GSTIN / UIN: {data.partyGstin}
              </Text>
            </View>
          </View>

          <View style={{ flexGrow: 1 }}>
            <Text
              style={[
                styles.headingText,
                {
                  paddingHorizontal: 2,
                  paddingVertical: 4,
                  marginHorizontal: 2,
                  marginVertical: 4,
                },
              ]}
            >
              INVOICE NO: {data.invoiceNo}
            </Text>
            <Text
              style={[
                styles.headingText,
                {
                  paddingHorizontal: 2,
                  paddingVertical: 4,
                  marginHorizontal: 2,
                  marginVertical: 4,
                },
              ]}
            >
              DATED: {data.date}
            </Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.row, styles.bold]}>
            <Text
              style={[styles.cellHeading, { flex: 0.2, textAlign: "center" }]}
            >
              S.N.
            </Text>
            <Text
              style={[styles.cellHeading, { flex: 2, textAlign: "center" }]}
            >
              Description on Services / Goods
            </Text>
            <Text
              style={[styles.cellHeading, { flex: 0.5, textAlign: "center" }]}
            >
              HSN/SAC CODE
            </Text>
            <Text
              style={[styles.cellHeading, { flex: 0.3, textAlign: "center" }]}
            >
              Unit
            </Text>
            <Text
              style={[styles.cellHeading, { flex: 0.8, textAlign: "center" }]}
            >
              Price
            </Text>
            <Text
              style={[
                styles.cellHeading,
                { flex: 0.8, textAlign: "center", borderRightWidth: 0 },
              ]}
            >
              Amount(INR)
            </Text>
          </View>
          {data.items.map((item, i) => (
            <View style={styles.row} key={i}>
              <Text style={[styles.cell, { flex: 0.2, textAlign: "center" }]}>
                {i + 1}
              </Text>
              <Text style={[styles.cell, { flex: 2, textAlign: "center" }]}>
                {item.desc}
              </Text>
              <Text style={[styles.cell, { flex: 0.5, textAlign: "center" }]}>
                998555
              </Text>
              <Text style={[styles.cell, { flex: 0.3, textAlign: "center" }]}>
                {item.qty}
              </Text>
              <Text style={[styles.cell, { flex: 0.8, textAlign: "right" }]}>
                {item.unitPrice}
              </Text>
              <Text
                style={[
                  styles.cell,
                  { flex: 0.8, textAlign: "right", borderRightWidth: 0 },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: "black",
            borderStyle: "solid",
          }}
        >
          <View
            style={{
              width: 358,
              borderRightWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
              height: 18,
            }}
          >
            <Text style={styles.simpleText}>Invoice value in Words</Text>
          </View>
          <View style={{ flexDirection: "row", height: 18 }}>
            <View
              style={{
                borderRightWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
                width: 154,
              }}
            >
              <Text style={styles.simpleText}>Total Amount Before TAX</Text>
            </View>
            <View style={{ width: 105 }}>
              <Text style={[styles.simpleText, { textAlign: "right" }]}>
                {data.totalBeforeTax}
              </Text>
            </View>
          </View>
        </View>

        {/* management coloumn  */}

        {data?.managementFee && (
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
            }}
          >
            <View
              style={{
                width: 358,
                borderRightWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
                height: 18,
              }}
            >
              <Text style={styles.simpleText}>Management Fee</Text>
            </View>
            <View style={{ flexDirection: "row", height: 18 }}>
              <View
                style={{
                  borderRightWidth: 1,
                  borderColor: "black",
                  borderStyle: "solid",
                  width: 154,
                }}
              >
                <Text style={styles.simpleText}>
                  Add: MF {data.managementFee} %
                </Text>
              </View>
              <View style={{ width: 105 }}>
                <Text style={[styles.simpleText, { textAlign: "right" }]}>
                  {data.managementFeeAmount}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "black",
            borderStyle: "solid",
          }}
        >
          <View
            style={{
              width: 358,
              borderRightWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styles.headingText,
                { padding: 4, textTransform: "capitalize" },
              ]}
            >
              {data.amountWords} Only
            </Text>
          </View>
          <View style={{ flexGrow: 1 }}>
            <View style={{ flexDirection: "row", height: 30 }}>
              <View
                style={{
                  width: 154,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.simpleText}>
                  Add: CGST {data.selectTax === "0.18" ? "09%" : "2.5%"}
                </Text>
                <Text style={styles.simpleText}>
                  Add: SGST {data.selectTax === "0.18" ? "09%" : "2.5%"}
                </Text>
              </View>
              <View
                style={{
                  width: 105,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  textAlign: "right",
                }}
              >
                <Text style={styles.simpleText}>0</Text>
                <Text style={styles.simpleText}>0</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 20,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 154,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <Text style={styles.simpleText}>
                  Add: IGST {data.selectTax === "0.18" ? "18%" : "5%"}
                </Text>
              </View>
              <View
                style={{
                  width: 105,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                  textAlign: "right",
                }}
              >
                <Text style={styles.simpleText}>{data.igst}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", height: 30 }}>
              <View
                style={{
                  width: 154,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.simpleText}>TAX Amount(GST)</Text>
                <Text style={styles.headingText}>Total Amount After TAX</Text>
              </View>
              <View
                style={{
                  width: 105,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  textAlign: "right",
                }}
              >
                <Text style={styles.simpleText}>{data.igst}</Text>
                <Text style={styles.headingText}>{data.grandTotal}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 18,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 154,
                  borderRightWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <Text style={styles.headingText}>Round Off (INR)</Text>
              </View>
              <View
                style={{
                  width: 105,
                  textAlign: "right",
                }}
              >
                <Text style={styles.headingText}>{data.grandTotal}</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 20,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 7, padding: "2px" }}>
            Please Pay this Amount to Beneficiary Name
          </Text>
        </View>
      </View>

      {/* Bank Details */}

      <View
        style={{
          fontSize: 10,
          paddingVertical: 4,
          paddingHorizontal: 2,
          position: "absolute",
          bottom: "60",
        }}
      >
        <Text style={{ marginVertical: 4 }}>
          KORPTRIP SERVICES PRIVATE LIMITED
        </Text>
        <Text style={{ marginVertical: 4 }}>Bank ICICI BANK: {data.bank}</Text>
        <Text style={{ marginVertical: 4 }}>
          A/C No : {data.accountNo} | IFSC Code : {data.ifsc}
        </Text>

        <Text style={{ marginVertical: 4 }}>PAN AAKCK6412D</Text>
        <Text style={{ marginVertical: 4 }}>TAN DELK27112B</Text>
        <Text
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "black",
            padding: "2px",
            fontSize: 7,
            fontWeight: "semibold",
          }}
        >
          DECLARATION : We declare that this invoice shows the actual price of
          the goods & Services described and that all particulars are true and
          correct .
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          right: "70",
          bottom: "80",
        }}
      >
        <Image style={{ height: 80, width: 220 }} src="/SS_Stamp&Sign.png" />
      </View>

      <View
        style={{
          position: "absolute",
          right: "140",
          bottom: "20",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Text>Signature: </Text>
        <Text>{data.signedBy}</Text>
        <Text>
          {data.date}, {data.day}
        </Text>
      </View>
    </Page>
  </Document>
);

export default function InvoiceForm() {
  const [formData, setFormData] = useState({
    invoiceType: "TAX-INVOICE",
    invoiceNo: "",
    date: "",
    partyName: "",
    partyAddress: "",
    partyPhoneNo: "",
    partyEmail: "",
    partyGstin: "",
    managementFee: "",
    managementFeeAmount: 0,
    items: [],
    totalBeforeTax: 0,
    igst: 0,
    selectTax: "0.18",
    grandTotal: 0,
    amountWords: "",
    day: "",
    bank: "ICICI BANK",
    accountNo: "182105003083",
    ifsc: "ICIC0001821",
    signedBy: "CA. Amit",
  });

  const [items, setItems] = useState([
    { desc: "", unitPrice: "", qty: "", amount: "" },
  ]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (i, e) => {
    const newItems = [...items];
    newItems[i][e.target.name] = e.target.value;
    // auto calculate amount
    if (newItems[i].unitPrice && newItems[i].qty) {
      const calcAmount =
        Number(newItems[i].unitPrice) * Number(newItems[i].qty);
      newItems[i].amount = calcAmount.toFixed(2);
    }

    setItems(newItems);
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setItems([...items, { desc: "", unitPrice: "", qty: "", amount: "" }]);
  };

  function numberToWordsIndian(num) {
    if (num === 0 || num === null || num === undefined) return "zero";

    const belowTwenty = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const scales = [
      { value: 10000000, name: "crore" },
      { value: 100000, name: "lakh" },
      { value: 1000, name: "thousand" },
      { value: 100, name: "hundred" },
    ];

    function helper(n) {
      if (n === 0) return "";
      if (n < 20) return belowTwenty[n] || "";
      if (n < 100) {
        return (
          tens[Math.floor(n / 10)] +
          (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "")
        );
      }

      for (let i = 0; i < scales.length; i++) {
        if (n >= scales[i].value) {
          return (
            helper(Math.floor(n / scales[i].value)) +
            " " +
            scales[i].name +
            (n % scales[i].value !== 0 ? " " + helper(n % scales[i].value) : "")
          ).trim();
        }
      }

      return ""; // ✅ always return a string
    }

    let result = helper(Number(num)); // ensure input is a number
    return (result || "").trim(); // ✅ safe trim
  }

  // const calculateTotalAmountBeforeTax = () => {
  //   return items.reduce((sum, item) => {
  //     return sum + parseInt(item.amount || 0);
  //   }, 0);
  // };

  // const calculateIGST = () => {
  //   return 0.18 * parseInt(formData.totalBeforeTax || 0);
  // };

  // const calculateTotalAmount = () => {
  //   return (
  //     parseInt(formData.totalBeforeTax || 0) + parseInt(formData.igst || 0)
  //   );
  // };

  useEffect(() => {
    const amount = items.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    console.log(formData.selectTax, typeof formData.selectTax);
    console.log(formData.managementFee, typeof formData.managementFee);

    let tax = 0;
    let managementFeeCalc = 0;
    if (Number(formData.managementFee) === 0) {
      console.log(formData.managementFee, typeof formData.managementFee);
      if (Number(formData.selectTax) === 0.18) {
        tax = 0.18 * amount;
      } else if (Number(formData.selectTax) === 0.05) {
        tax = 0.05 * amount;
      }
    } else {
      console.log(formData.managementFee, typeof formData.managementFee);
      managementFeeCalc = (Number(formData.managementFee) / 100) * amount;
      console.log(managementFeeCalc);
      if (Number(formData.selectTax) === 0.18) {
        tax = 0.18 * managementFeeCalc;
      } else if (Number(formData.selectTax) === 0.05) {
        tax = 0.05 * managementFeeCalc;
      }
    }

    const roundedAmount = amount.toFixed(2);
    const roundedManagementFee = managementFeeCalc.toFixed(2);
    const roundedTax = tax.toFixed(2);

    let roundedFinalAmount = 0;
    if (formData.managementFee) {
      roundedFinalAmount = Math.round(
        Number(roundedAmount) +
          Number(roundedTax) +
          Number(roundedManagementFee)
      );
    } else {
      roundedFinalAmount = Math.round(
        Number(roundedAmount) + Number(roundedTax)
      );
    }

    const numberInWord = numberToWordsIndian(roundedFinalAmount);

    const dateCopy = new Date(formData.date);
    // console.log(formData.date);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayFind = days[dateCopy.getDay()];
    // console.log(dayFind);
    console.log(formData.selectTax, typeof formData.selectTax);
    setFormData((prev) => ({
      ...prev,
      totalBeforeTax: roundedAmount,
      igst: roundedTax,
      managementFeeAmount: roundedManagementFee,
      grandTotal: roundedFinalAmount,
      amountWords: numberInWord,
      day: dayFind,
    }));
  }, [items, formData.date, formData.selectTax, formData.managementFee]);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Invoice Form</h2>
      {/* Party Details */}

      <div className="flex items-center gap-3 w-full">
        <label
          htmlFor="invoice"
          className="font-semibold text-gray-700 whitespace-nowrap"
        >
          Invoice Type -:{" "}
        </label>
        <select
          name="invoiceType"
          id="invoice"
          value={formData.invoiceType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          <option value="TAX-INVOICE">TAX-INVOICE</option>
          <option value="PROFORMA-INVOICE">PROFORMA-INVOICE</option>
        </select>
      </div>

      <input
        name="invoiceNo"
        placeholder="Invoice No"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="date"
        type="date"
        placeholder="Date"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="partyName"
        placeholder="Party Name"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="partyAddress"
        placeholder="Party Address"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="partyPhoneNo"
        placeholder="Party PhoneNumber"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="partyEmail"
        placeholder="Party Email"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="partyGstin"
        placeholder="Party GSTIN"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="managementFee"
        placeholder="Management Fee Percentage"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <div className="flex items-center gap-3 w-full">
        <label className="font-semibold text-gray-700 whitespace-nowrap">
          TAX RATE:
        </label>
        <select
          name="selectTax"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0.18}>18%</option>
          <option value={0.05}>5%</option>
        </select>
      </div>

      {/* Items */}
      <h3 className="font-bold">Items</h3>
      {items.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full"
        >
          <input
            name="desc"
            placeholder="Description"
            value={item.desc}
            onChange={(e) => handleItemChange(i, e)}
            className="border p-2 w-full"
          />
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) => handleItemChange(i, e)}
            onBlur={(e) =>
              handleItemChange(i, {
                target: {
                  name: "unitPrice",
                  value: Number(e.target.value || 0).toFixed(2),
                },
              })
            }
            className="border p-2 w-full"
          />
          <input
            name="qty"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) => handleItemChange(i, e)}
            className="border p-2 w-full"
          />
          <input
            name="amount"
            placeholder="Amount"
            value={item.amount ? Number(item.amount).toFixed(2) : "0"}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
        <button
          type="button"
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-80"
        >
          Add Item
        </button>

        <PDFDownloadLink
          document={<InvoiceDocument data={formData} />}
          fileName="invoice.pdf"
          className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-80 block text-center"
        >
          {({ loading }) => (loading ? "Preparing..." : "Download Invoice")}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
