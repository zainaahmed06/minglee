import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Button from '@/components/Button';
import {colors, spacing} from '@/theme';

const ButtonExample = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate a loading state when button is pressed
  const handleLoadingButtonPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Button Component Examples</Text>
      
      {/* Basic Button Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variants</Text>
        <Button variant="solid" style={styles.button}>Solid Button</Button>
        <Button variant="bordered" style={styles.button}>Bordered Button</Button>
        <Button variant="light" style={styles.button}>Light Button</Button>
        <Button variant="flat" style={styles.button}>Flat Button</Button>
        <Button variant="faded" style={styles.button}>Faded Button</Button>
        <Button variant="ghost" style={styles.button}>Ghost Button</Button>
      </View>
      
      {/* Colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colors</Text>
        <Button color="default" style={styles.button}>Default Color</Button>
        <Button color="primary" style={styles.button}>Primary Color</Button>
        <Button color="secondary" style={styles.button}>Secondary Color</Button>
        <Button color="success" style={styles.button}>Success Color</Button>
        <Button color="warning" style={styles.button}>Warning Color</Button>
        <Button color="danger" style={styles.button}>Danger Color</Button>
      </View>
      
      {/* Sizes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes</Text>
        <Button size="sm" style={styles.button}>Small Button</Button>
        <Button size="md" style={styles.button}>Medium Button</Button>
        <Button size="lg" style={styles.button}>Large Button</Button>
      </View>
      
      {/* Radius */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Radius</Text>
        <Button radius="none" style={styles.button}>No Radius</Button>
        <Button radius="sm" style={styles.button}>Small Radius</Button>
        <Button radius="md" style={styles.button}>Medium Radius</Button>
        <Button radius="lg" style={styles.button}>Large Radius</Button>
        <Button radius="full" style={styles.button}>Full Radius</Button>
      </View>
      
      {/* With Icons and Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Content</Text>
        <Button 
          startContent={<Text style={styles.icon}>👈</Text>}
          style={styles.button}>
          With Start Content
        </Button>
        <Button 
          endContent={<Text style={styles.icon}>👉</Text>}
          style={styles.button}>
          With End Content
        </Button>
        <Button 
          startContent={<Text style={styles.icon}>🔍</Text>}
          endContent={<Text style={styles.icon}>👉</Text>}
          style={styles.button}>
          Both Contents
        </Button>
      </View>
      
      {/* States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>States</Text>
        <Button 
          isLoading={isLoading} 
          onPress={handleLoadingButtonPress}
          style={styles.button}>
          {isLoading ? 'Loading...' : 'Click to Load'}
        </Button>
        <Button isDisabled style={styles.button}>Disabled Button</Button>
        <Button fullWidth style={styles.button}>Full Width Button</Button>
        <Button 
          isIconOnly 
          startContent={<Text style={styles.icon}>🔔</Text>}
          style={styles.iconButton}>
        </Button>
      </View>
      
      {/* Combinations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Combinations</Text>
        <Button 
          variant="bordered"
          color="primary"
          size="lg"
          radius="full"
          style={styles.button}>
          Rounded Primary Bordered
        </Button>
        <Button 
          variant="solid"
          color="success"
          startContent={<Text style={styles.icon}>✓</Text>}
          style={styles.button}>
          Success with Icon
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.text,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: colors.textSecondary,
  },
  button: {
    marginVertical: spacing.xs,
  },
  iconButton: {
    marginVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 16,
  }
});

export default ButtonExample;
