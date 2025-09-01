import {Input} from "@/components/Input";
import {colors, spacing} from "@/theme";
import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";

const InputExample = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");

  // Email validation function
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    return {
      isValid,
      errorMessage: isValid ? undefined : "Please enter a valid email address",
    };
  };

  // Password validation function
  const validatePassword = (value: string) => {
    const isValid = value.length >= 8;
    return {
      isValid,
      errorMessage: isValid
        ? undefined
        : "Password must be at least 8 characters long",
    };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Input Component Examples</Text>

      {/* Basic Inputs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Input</Text>
        <Input
          label='Name'
          placeholder='Enter your name'
          value={name}
          onValueChange={setName}
        />
      </View>

      {/* Input with Validation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Input with Validation</Text>
        <Input
          label='Email'
          placeholder='example@email.com'
          type='email'
          value={email}
          onValueChange={setEmail}
          validate={validateEmail}
          description="We'll never share your email with anyone else."
        />
      </View>

      {/* Password Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Password Input</Text>
        <Input
          label='Password'
          placeholder='Enter your password'
          type='password'
          value={password}
          onValueChange={setPassword}
          validate={validatePassword}
          description='Password must be at least 8 characters long'
        />
      </View>

      {/* Input with Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Input with Icons</Text>
        <Input
          label='Search'
          placeholder='Search...'
          type='search'
          value={search}
          onValueChange={setSearch}
          startContent={<Text style={styles.icon}>🔍</Text>}
          isClearable
        />
      </View>

      {/* Required Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Input</Text>
        <Input
          label='Bio'
          placeholder='Tell us about yourself'
          value={bio}
          onValueChange={setBio}
          isRequired
        />
      </View>

      {/* Input States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Input States</Text>
        <Input
          label='Disabled Input'
          placeholder='This input is disabled'
          isDisabled
        />
        <View style={styles.spacer} />
        <Input
          label='Read-only Input'
          placeholder='This input is read-only'
          value="Can't edit this"
          isReadOnly
        />
        <View style={styles.spacer} />
        <Input
          label='Invalid Input'
          placeholder='This input is invalid'
          value='Invalid value'
          isInvalid
          errorMessage="There's an error with this input"
        />
      </View>

      {/* Input Sizes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Input Sizes</Text>
        <Input label='Small Input' placeholder='Small input' size='sm' />
        <View style={styles.spacer} />
        <Input label='Medium Input' placeholder='Medium input' size='md' />
        <View style={styles.spacer} />
        <Input label='Large Input' placeholder='Large input' size='lg' />
      </View>

      {/* Phone Input Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phone Input</Text>
        <Input
          label='Phone'
          placeholder='(555) 555-5555'
          type='tel'
          value={phone}
          onValueChange={setPhone}
          startContent={<Text style={styles.icon}>📞</Text>}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.lg,
    textAlign: "center",
    color: colors.text,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: spacing.sm,
    color: colors.textSecondary,
  },
  spacer: {
    height: spacing.md,
  },
  icon: {
    fontSize: 16,
  },
});

export default InputExample;
