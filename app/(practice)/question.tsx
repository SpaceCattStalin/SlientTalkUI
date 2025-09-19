import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors, fontSizes, spacing } from '@/global/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ArrowRight } from 'lucide-react-native';

import ResetQuestion from '@/assets/images/reset-question.svg';

type Question = {
    question: string;
    options: string[];
    correct: string;
};

type Props = {
    questions: Question[];
};

const questions = [
    {
        question: "What is 'apple' in Spanish?",
        options: ["A. Manzana", "B. Naranja", "C. Pera", "D. Uva"],
        correct: "Manzana",
    },
    {
        question: "Translate 'cat' to French",
        options: ["Chien", "Chat", "Lapin", "Oiseau"],
        correct: "Chat",
    },
];

const Question = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showFeedBack, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    let currentQuestion = questions[questionIndex];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.cancelBtn}>
                        <Feather name="x" size={24} color={colors.primary600} />
                    </TouchableOpacity>
                    <View style={styles.progressBarContainer}>
                        <Text>T</Text>
                    </View>
                    {/* <View>
                        <Text>
                            Progress bar
                        </Text>
                        <Text>
                            AnimatedText
                        </Text>
                    </View> */}
                </View>
                <Text style={styles.question}>{currentQuestion.question}</Text>

                <View style={styles.videoContainer}>
                    <View style={styles.videoView}>
                        <Text>Video viewer</Text>
                    </View>
                    <View style={styles.videoActionBtnContainer}>
                        <FontAwesome name="refresh" size={24} color={colors.primary700} />
                        <Feather name="flag" size={24} color={colors.primary700} />
                    </View>
                </View>
                <View style={styles.questionView}>
                    {currentQuestion.options.map((option, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                            >
                                <Text style={styles.option}>{option}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.actionBtnContainer}>
                    <TouchableOpacity>
                        <ResetQuestion width={26} height={26} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nextBtn}>
                        <ArrowRight width={26} height={26} color={colors.gray50} />
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default Question;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary500
    },
    main: {
        flex: 1,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.md
    },
    header: {
        flexDirection: 'row',
        gap: spacing.md
    },
    cancelBtn: {
        padding: spacing.sm * .5,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: colors.primary50,
        borderColor: '#ddd',
        borderWidth: .5,
    },
    progressBarContainer: {
        flex: 1,
        // backgroundColor: 'red'
    },
    question: {
        marginTop: spacing.lg,
        color: colors.gray50,
        fontSize: fontSizes['2xl'],
        fontWeight: 600
    },
    videoContainer: {
        marginTop: spacing.lg,
        flex: 4,
    },
    videoView: {
        flex: 1,
        backgroundColor: colors.primary300
    },
    videoActionBtnContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    questionView: {
        marginTop: spacing.md,
        flex: 1
    },
    option: {
        color: colors.gray50,
        marginBottom: spacing.xs * .75,
        fontWeight: 600,
        fontSize: fontSizes.md * 1.2
    },
    actionBtnContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nextBtn: {
        width: 35,
        height: 35,
        borderRadius: 30,
        backgroundColor: colors.primary300,
        borderColor: colors.gray50,
        borderWidth: .75,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
});