import add from "../utils/add";

describe('add function', () => {

    describe('Basic Functionalities', () => {
        test('adds two positive numbers', () => {
            expect(add(5, 3)).toEqual(8);
        });

        test('adds two negative numbers', () => {
            expect(add(-4, -6)).toEqual(-10);
        });

        test('adds a positive and a negative number', () => {
            expect(add(-2, 3)).toEqual(1);
        });

        test('adds two floating point numbers', () => {
            expect(add(2.5, 3.1)).toEqual(5.6);
        });
    });

    describe('Edge Case Handling', () => {
        test('handles one undefined argument', () => {
            expect(add(undefined, 5)).toEqual(5);
            expect(add(4, undefined)).toEqual(4);
        });

        test('handles both arguments as undefined', () => {
            expect(add(undefined, undefined)).toEqual(0);
        });

        test('adds string representations of numbers', () => {
            expect(add('4', '3')).toEqual(7);
        });

        test('adds a number and a string representation of a number', () => {
            expect(add(2, '3')).toEqual(5);
            expect(add('5', 3)).toEqual(8);
        });
    });

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: Financial Calculations', () => {
            test('calculates total cost of items', () => {
                const price1 = 9.99;
                const price2 = 5.50;
                expect(add(price1, price2)).toBeCloseTo(15.49);
            });

            test('calculates the sum of multiple prices', () => {
                const prices = [4.99, 2.50, 7.25];
                const total = prices.reduce((acc, price) => add(acc, price), 0);
                expect(total).toBeCloseTo(14.74);
            });

            test('calculates total with a discount applied', () => {
                const originalPrice = 50;
                const discount = -10;
                expect(add(originalPrice, discount)).toEqual(40);
            });

            test('handles floating point precision issues', () => {
                const price1 = 0.1;
                const price2 = 0.2;
                expect(add(price1, price2)).toBeCloseTo(0.3);
            });

            test('calculates total cost with tax included', () => {
                const price = 100;
                const taxRate = 0.15;
                const taxAmount = price * taxRate;
                expect(add(price, taxAmount)).toBeCloseTo(115);
            });

            test('adds zero to a price', () => {
                const price = 25;
                expect(add(price, 0)).toEqual(25);
            });

            test('calculates total cost of an empty cart', () => {
                const cart = [];
                const total = cart.reduce((acc, item) => add(acc, item.price), 0);
                expect(total).toEqual(0);
            });
        });

        describe('Scenario 2: Measurements and Analytics', () => {
            test('adds two measurement values', () => {
                const length1 = 150;
                const length2 = 200;
                expect(add(length1, length2)).toEqual(350);
            });

            test('adds multiple distance values', () => {
                const distances = [40, 60, 100];
                const totalDistance = distances.reduce((acc, distance) => add(acc, distance), 0);
                expect(totalDistance).toEqual(200);
            });

            test('adds weights of different objects', () => {
                const weight1 = 1.5;
                const weight2 = 2.3;
                expect(add(weight1, weight2)).toBeCloseTo(3.8);
            });

            test('accumulates data points in a dataset', () => {
                const dataPoints = [10, 20, 30, 40, 50];
                const totalPoints = dataPoints.reduce((acc, point) => add(acc, point), 0);
                expect(totalPoints).toEqual(150);
            });

            test('calculates total length of multiple strings or objects', () => {
                const sizes = [{ length: 5 }, { length: 15 }, { length: 10 }];
                const totalSize = sizes.reduce((acc, size) => add(acc, size.length), 0);
                expect(totalSize).toEqual(30);
            });

            test('calculates total capacity of containers', () => {
                const capacities = [500, 750, 250];
                const totalCapacity = capacities.reduce((acc, capacity) => add(acc, capacity), 0);
                expect(totalCapacity).toEqual(1500);
            });

            test('adds two temperatures for averaging', () => {
                const temp1 = 22;
                const temp2 = 28;
                expect(add(temp1, temp2)).toEqual(50);
            });
        });

        describe('Scenario 3: Score Tallying', () => {
            test('calculates total score in a game', () => {
                const score1 = 120;
                const score2 = 150;
                expect(add(score1, score2)).toEqual(270);
            });

            test('adds up points across different rounds', () => {
                const round1Points = 30;
                const round2Points = 40;
                const round3Points = 50;
                expect(add(add(round1Points, round2Points), round3Points)).toEqual(120);
            });

            test('calculates cumulative score in a tournament', () => {
                const tournamentScores = [200, 180, 220, 240];
                const totalScore = tournamentScores.reduce((total, score) => add(total, score), 0);
                expect(totalScore).toEqual(840);
            });

            test('adds bonus points to a player\'s score', () => {
                const baseScore = 100;
                const bonusPoints = 20;
                expect(add(baseScore, bonusPoints)).toEqual(120);
            });

            test('tallies individual and team scores', () => {
                const individualScores = [50, 60, 70];
                const teamBonus = 30;
                const totalTeamScore = individualScores.reduce((total, score) => add(total, score), teamBonus);
                expect(totalTeamScore).toEqual(210);
            });

            test('calculates total score from multiple judges', () => {
                const judge1Score = 8.5;
                const judge2Score = 8.7;
                const judge3Score = 9.0;
                const totalScore = add(add(judge1Score, judge2Score), judge3Score);
                expect(totalScore).toBeCloseTo(26.2);
            });

            test('adds incremental points in a reward system', () => {
                const initialPoints = 500;
                const rewardPoints = 50;
                expect(add(initialPoints, rewardPoints)).toEqual(550);
            });

            test('accumulates scores from different game modes', () => {
                const arcadeModeScore = 300;
                const storyModeScore = 450;
                expect(add(arcadeModeScore, storyModeScore)).toEqual(750);
            });
        });
    });
});