import {
  Card,
  Divider,
  Form,
  FormLayout,
  InlineGrid,
  Text,
  TextField,
} from "@shopify/polaris";
import styles from "./Home.module.css";
import { useCallback, useState } from "react";
import { PRODUCT_PLACEHODLER } from "~/routes/lib/constants";
import { formatToMoney } from "~/routes/lib/formatters/numbers";

export const ProFroma = () => {
  const [form, setForm] = useState({
    price: 60,
    qty: 5,
  });

  return (
    <Card padding="800">
      <InlineGrid
        gap="400"
        alignItems="center"
        columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
      >
        <div className={styles.imageContainer}>
          <img
            src={PRODUCT_PLACEHODLER}
            alt=""
            style={{
              padding: "1rem",
            }}
          />
        </div>
        <div className={styles.proFormaContainer}>
          <Text as="h4" variant="headingMd" alignment="start">
            Expected Revenue to Generate
          </Text>
          <Divider borderColor="transparent" borderWidth="100" />
          <Text as="p" variant="bodyMd">
            Your cost for the hoodies starts at{" "}
            <Text
              as="strong"
              variant="bodyMd"
              fontWeight="semibold"
              tone="magic"
            >
              $20.00
            </Text>
          </Text>
          <SellFor setForm={setForm} form={form} />
          <DailyQuantity setForm={setForm} form={form} />
          <Text as="p" variant="bodyMd">
            Approximate annual revenue
          </Text>
          <Text as="h2" variant="heading2xl" tone="magic" fontWeight="bold">
            {`$${formatToMoney(Number(form.price * form.qty * 365))}`}
          </Text>
        </div>
      </InlineGrid>
    </Card>
  );
};

type FormProps = {
  setForm: React.Dispatch<
    React.SetStateAction<{
      price: number;
      qty: number;
    }>
  >;
  form: {
    price: number;
    qty: number;
  };
};

export const SellFor = ({ setForm, form }: FormProps) => {
  const handleSubmit = useCallback(() => {
    setForm({ ...form });
  }, [form, setForm]);

  const handlePriceChange = useCallback(
    (value: string) =>
      setForm((prevForm) => ({ ...prevForm, price: Number(value) })),
    [setForm],
  );

  return (
    <div className={styles.sellForWrapper} style={{ marginTop: "2.5rem" }}>
      <div className={styles.txt}>
        <Text as="p" variant="bodyMd">
          You sell for
        </Text>
        <Text as="p" variant="bodyXs" tone="magic">
          Recommended Price
        </Text>
      </div>
      <div className={styles.proFormaForm}>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={String(form.price)}
              onChange={handlePriceChange}
              label=""
              type="number"
              prefix="$"
              autoComplete="off"
            />
          </FormLayout>
        </Form>
      </div>
    </div>
  );
};

export const DailyQuantity = ({ setForm, form }: FormProps) => {
  const handleSubmit = useCallback(() => {
    setForm({ ...form });
  }, [form, setForm]);

  const handleQtyChange = useCallback(
    (value: string) =>
      setForm((prevForm) => ({ ...prevForm, qty: Number(value) })),
    [setForm],
  );

  return (
    <div className={styles.sellForWrapper} style={{ marginBottom: "2.5rem" }}>
      <div className={styles.txt}>
        <Text as="p" variant="bodyMd">
          Sales per Day
        </Text>
      </div>
      <div className={styles.proFormaForm}>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={String(form.qty)}
              onChange={handleQtyChange}
              label=""
              type="number"
              autoComplete="off"
            />
          </FormLayout>
        </Form>
      </div>
    </div>
  );
};
