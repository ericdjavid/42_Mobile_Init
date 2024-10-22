import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useUserStore } from '@/useUserStore';

export default function TabTwoScreen() {
  const userInfo = useUserStore((state) => state.userInfo);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      {userInfo.map((user, index) => (
        <View key={index} style={styles.userContainer}>
          <Text style={styles.userInfo}>Login: {user.login}</Text>
          <Text style={styles.userInfo}>Email: {user.email}</Text>
          <Text style={styles.userInfo}>First Name: {user.first_name}</Text>
          <Text style={styles.userInfo}>Last Name: {user.last_name}</Text>

          <Text style={styles.sectionTitle}>Skills</Text>
          {user.cursus_users[0].skills.map((skill) => (
            <View key={skill.id} style={styles.skillContainer}>
              <Text style={styles.skillText}>{skill.name}: {skill.level.toFixed(2)} ({(skill.level * 100 / 21).toFixed(1)}%)</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Projects</Text>
          {user.projects_users.map((project) => (
            <View key={project.id} style={styles.projectContainer}>
              <Text style={styles.projectText}>{project.project.name}</Text>
              <Text style={styles.projectStatus}>Status: {project.status}</Text>
              <Text style={styles.projectMark}>Final Mark: {project.final_mark !== null ? project.final_mark : 'N/A'}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  userInfo: {
    fontSize: 16,
    marginVertical: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  skillContainer: {
    marginVertical: 5,
  },
  skillText: {
    fontSize: 16,
  },
  projectContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  projectText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectStatus: {
    fontSize: 14,
    color: '#555',
  },
  projectMark: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center',
  },
});
