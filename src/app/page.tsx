"use client";

import React, { useEffect, useState } from "react";

import { Text, Flex, Button, Avatar, RevealFx } from "@/once-ui/components";

export default function Home() {
  const [quote, setQuote] = useState<
    { text: string; author: string } | undefined
  >(undefined);

  async function fetchQuoteData() {
    const url = "https://stoic-quotes.com/api/quote";
    try {
      const response = await fetch(url);
      const myData = await response.json();
      setQuote(myData);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchQuoteData();
  }, [100]);

  return (
    <Flex
      fillWidth
      paddingTop="l"
      paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}
    >
      <Avatar size="xl" src="/images/cover.png" />
      <Text
        style={{ padding: 10, fontSize: 25, color: "green" }}
        onBackground="brand-medium"
      >
        Login to stoic
      </Text>
      <Button
        onClick={() => fetchQuoteData()}
        variant="primary"
        size="m"
        label="Refresh"
        //prefixIcon="FaGoogle"
      />
      {quote ? (
        <Flex
          fillWidth
          justifyContent="center"
          width={50}
          height={10}
          background="brand-strong"
          direction="column"
          margin="12"
          radius="l"
        >
          <RevealFx speed="fast" trigger delay={0} translateY={0}>
            <Flex align="center" direction="column" padding="12" gap="8">
              <Text variant="heading-strong-m">{quote.text} </Text>
              <Text
                variant="heading-strong-s"
                onBackground="neutral-medium"
                marginBottom="16"
              >
                -{quote.author}
              </Text>
            </Flex>
          </RevealFx>
        </Flex>
      ) : null}
    </Flex>
  );
}
