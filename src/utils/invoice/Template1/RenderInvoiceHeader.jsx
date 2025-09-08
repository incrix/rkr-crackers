"use client";
import { Text, View, Image } from "@react-pdf/renderer";
import Logo from "@/public/Images/rkrLogo.png";

export default function RenderInvoiceHeader() {
  return (
    <View fixed style={{ flexDirection: "row", gap: 10 }}>
      <Image
        width={100}
        height={100}
        src={Logo.src}
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
        }}
      />
      <View style={{ gap: 2, fontSize: 8 }}>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Lato Bold",
            textTransform: "uppercase",
          }}
        >
          RKR Fireworks
        </Text>
        <Text
          style={{
            color: "#333",
            maxWidth: 220,
            fontFamily: "Lato",
          }}
        >
          3/1427/G6, Opposite PRC Bus Depot, Sattur Road, Sivakasi - 626123.
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text
            style={{
              color: "#333",
              maxWidth: 200,
            }}
          >
            Mobile: +91 88387 80610
          </Text>
          <Text
            style={{
              color: "#333",
              maxWidth: 200,
            }}
          >
            Email: rkrcrackers@gmail.com
          </Text>
        </View>
        <Text
          style={{
            color: "#333",
            maxWidth: 200,
          }}
        >
          Website: www.rkrcrackers.com/
        </Text>
      </View>
      <View
        style={{
          fontSize: 8,
          marginLeft: "auto",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <Text
          style={{
            color: "#0080FF",
            fontFamily: "Lato Bold",
          }}
        >
          TAX INVOICE
        </Text>
        <Text
          style={{
            color: "#333",
            fontFamily: "Lato",
          }}
        >
          ORIGINAL FOR RECIPIENT
        </Text>
      </View>
    </View>
  );
}
