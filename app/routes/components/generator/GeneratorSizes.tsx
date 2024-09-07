import {
  LegacyStack,
  Tag,
  Listbox,
  EmptySearchResult,
  Combobox,
  Text,
  AutoSelection,
  Card,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { useState, useCallback, useMemo } from "react";
import {
  GeneratorStateProps,
  MockupSizeTypes,
} from "~/routes/lib/types/mockups";

export function GeneratorSizes({
  mockup,
  setMockup,
}: {
  mockup: GeneratorStateProps;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) {
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleActiveOptionChange = useCallback(
    (activeOption: string) => {
      const activeOptionIsAction = activeOption === value;

      if (
        !activeOptionIsAction &&
        !mockup.sizes.includes(activeOption as MockupSizeTypes)
      ) {
        setSuggestion(activeOption);
      } else {
        setSuggestion("");
      }
    },
    [value, mockup.sizes],
  );
  const updateSelection = useCallback(
    (selected: MockupSizeTypes) => {
      const nextSelectedTags = new Set([...mockup.sizes]);

      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      setMockup((prev) => ({ ...prev, sizes: [...nextSelectedTags] }));
      setValue("");
      setSuggestion("");
    },
    [mockup.sizes],
  );

  const removeTag = useCallback(
    (tag: MockupSizeTypes) => () => {
      updateSelection(tag);
    },
    [updateSelection],
  );

  const getAllTags = useCallback(() => {
    const savedTags = [
      "SMALL",
      "MEDIUM",
      "LARGE",
      "XL",
      "2XL",
      "3XL",
      "4XL",
      "5XL",
    ];
    return [...new Set([...savedTags, ...mockup.sizes].sort())];
  }, [mockup.sizes]);

  const formatOptionText = useCallback(
    (option: string) => {
      const trimValue = value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

      if (!value || matchIndex === -1) return option;

      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);

      return (
        <p>
          {start}
          <Text fontWeight="bold" as="span">
            {highlight}
          </Text>
          {end}
        </p>
      );
    },
    [value],
  );

  const escapeSpecialRegExCharacters = useCallback(
    (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    [],
  );

  const options = useMemo(() => {
    let list;
    const allTags = getAllTags();
    const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");

    if (value) {
      list = allTags.filter((tag) => tag.match(filterRegex));
    } else {
      list = allTags;
    }

    return [...list];
  }, [value, getAllTags, escapeSpecialRegExCharacters]);

  const verticalContentMarkup =
    mockup.sizes.length > 0 ? (
      <InlineStack gap={"100"}>
        {mockup.sizes.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </InlineStack>
    ) : null;

  const optionMarkup =
    options.length > 0
      ? options.map((option) => {
          return (
            <Listbox.Option
              key={option}
              value={option}
              selected={mockup.sizes.includes(option as MockupSizeTypes)}
              accessibilityLabel={option}
            >
              <Listbox.TextOption
                selected={mockup.sizes.includes(option as MockupSizeTypes)}
              >
                {formatOptionText(option)}
              </Listbox.TextOption>
            </Listbox.Option>
          );
        })
      : null;

  const emptyStateMarkup = optionMarkup ? null : (
    <EmptySearchResult
      title=""
      description={`No tags found matching "${value}"`}
    />
  );

  const listboxMarkup =
    optionMarkup || emptyStateMarkup ? (
      <Listbox
        autoSelection={AutoSelection.None}
        onSelect={updateSelection}
        onActiveOptionChange={handleActiveOptionChange}
      >
        {optionMarkup}
      </Listbox>
    ) : null;

  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Sizes
          </Text>
        </div>
        <Combobox
          allowMultiple
          activator={
            <Combobox.TextField
              autoComplete="off"
              label="Search tags"
              labelHidden
              value={value}
              suggestion={suggestion}
              placeholder="Search tags"
              verticalContent={verticalContentMarkup}
              onChange={setValue}
            />
          }
        >
          {listboxMarkup}
        </Combobox>
      </BlockStack>
    </Card>
  );
}
